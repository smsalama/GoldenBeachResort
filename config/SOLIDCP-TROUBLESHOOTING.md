# SolidCP + IIS + HTTP Bridge — troubleshooting 500 errors

## What your diagnostics proved

`npm run diagnose` passed — the app, database, and folders are fine when **you** run Node.
The 500 happens because **IIS never successfully starts Node** (empty `logs\` folder).

## Fix 1 — Replace web.config (most likely)

Your live `web.config` contained:

```xml
<security>
  <requestFiltering>
    <requestLimits maxAllowedContentLength="52428800" />
  </requestFiltering>
</security>
```

On SolidCP hosts this section is usually **locked at the server level**. It causes:

- SolidCP panel error when opening the website (`GetDirectoryBrowseSettings` / `web.config` COM error)
- IIS may return **500** without starting Node
- **Empty** `logs\` folder (process never launches)

**Action:** upload the new `config\web.config` to:

```
C:\HostingSpaces\GoldenBeach\new.goldenbeachresort.net\wwwroot\web.config
```

Also fix these in the old file:

| Setting | Was | Should be |
|---------|-----|-----------|
| `NODE_ENV` | `Production` | `production` (lowercase) |
| `startupTimeLimit` | `20` | `120` |
| `stdoutLogFile` | `.\logs\node.log` | `.\logs\node` (prefix only; IIS adds timestamp) |

Set **max upload ≥ 50 MB** in SolidCP website settings instead of `requestFiltering`.

Then **recycle the app pool** in SolidCP or IIS Manager.

---

## Fix 2 — App pool permissions

Grant the site app pool identity (e.g. `IIS AppPool\new.goldenbeachresort.net`):

| Path | Permission |
|------|------------|
| `wwwroot\` | Read & execute |
| `wwwroot\server\.env` | **Read** (not just server.js) |
| `wwwroot\server\node_modules\` | Read & execute |
| `wwwroot\media\` | Modify |
| `wwwroot\logs\` | Modify |
| `C:\Program Files\nodejs\node.exe` | Read & execute |

---

## Fix 3 — Verify HTTP Bridge handler

In **IIS Manager** → site → **Handler Mappings**, confirm **httpPlatformHandler** exists.

HTTP Bridge is a drop-in replacement — keep `modules="httpPlatformHandler"` in web.config.

App pool: **.NET CLR version = No Managed Code**, **64-bit** enabled.

---

## Fix 4 — Test Node manually on the server

```powershell
cd C:\HostingSpaces\GoldenBeach\new.goldenbeachresort.net\wwwroot\server
$env:NODE_ENV="production"
$env:PORT="3000"
node server.js
```

Browse `http://127.0.0.1:3000/` on the server. If this works, the app is fine — only IIS integration needs fixing.

---

## Fix 5 — Event ID 1034: "Unable to get configuration section httpPlatform"

The HTTP Bridge module is installed, but **IIS cannot read `<httpPlatform>` from your site's web.config**.
This is common on **SolidCP** when the section is locked or extra attributes cause an authoring error.

### Try A — Minimal web.config

Replace `wwwroot\web.config` with `config\web.config.minimal` (strips optional attributes).
Recycle app pool and test again.

### Try B — Configure httpPlatform via appcmd (server admin)

Run in **elevated** CMD on the server (site name may differ — check IIS Manager):

```cmd
%windir%\system32\inetsrv\appcmd.exe set config "new.goldenbeachresort.net" /section:system.webServer/httpPlatform /processPath:"C:\Program Files\nodejs\node.exe" /arguments:".\server\server.js" /stdoutLogEnabled:"true" /stdoutLogFile:".\logs\node" /startupTimeLimit:"120"

%windir%\system32\inetsrv\appcmd.exe set config "new.goldenbeachresort.net" /section:system.webServer/httpPlatform /+"environmentVariables.[name='PORT',value='%HTTP_PLATFORM_PORT%']"

%windir%\system32\inetsrv\appcmd.exe set config "new.goldenbeachresort.net" /section:system.webServer/httpPlatform /+"environmentVariables.[name='NODE_ENV',value='production']"
```

Then use a web.config with **only the handler** (no `<httpPlatform>` block):

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="httpPlatformHandler" path="*" verb="*"
           modules="httpPlatformHandler" resourceType="Unspecified" />
    </handlers>
  </system.webServer>
</configuration>
```

Verify section exists:

```cmd
appcmd.exe list config "new.goldenbeachresort.net" -section:system.webServer/httpPlatform
```

Ask Innovix/SolidCP support to **unlock `system.webServer/httpPlatform`** for your site if appcmd fails.

### Try C — Proxy + Windows Service (most reliable on SolidCP)

Skip httpPlatform entirely:

1. `config\install-node-service.ps1` — runs Node on port 3000 as a Windows service (uses NSSM)
2. `config\web.config.proxy` — IIS reverse-proxies to `127.0.0.1:3000`
3. Enable **ARR proxy** in IIS Manager

---

## Fix 6 — Proxy fallback (summary)

1. Copy `config\web.config.proxy` → `wwwroot\web.config`
2. Start Node on port 3000 (see `start-node.ps1`) or install as a Windows service with [NSSM](https://nssm.cc/)
3. Enable **ARR proxy** in IIS (Server → Application Request Routing → Enable proxy)
4. Install **URL Rewrite** if missing

---

## After recycling the app pool

Check:

```
wwwroot\logs\node_*.log          ← HTTP Bridge stdout
wwwroot\logs\gbr-startup.log     ← Node startup errors (upload latest server.js)
```

Paste the last 30 lines if still failing.
