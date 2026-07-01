/* Golden Beach Resort — i18n EN/DE/RU
   Text-node walker: replaces known EN strings with selected language.
   Language persists via localStorage across all pages. */
(function(){
const DICT = {
  /* ── NAVIGATION ── */
  "Home": {de:"Startseite", ru:"Главная"},
  "Rooms": {de:"Zimmer", ru:"Номера"},
  "Outlets": {de:"Gastronomie", ru:"Рестораны"},
  "Restaurants": {de:"Restaurants", ru:"Рестораны"},
  "Bars & Cafés": {de:"Bars & Cafés", ru:"Бары и кафе"},
  "Activities": {de:"Aktivitäten", ru:"Активности"},
  "Facilities": {de:"Einrichtungen", ru:"Услуги"},
  "Entertainment": {de:"Unterhaltung", ru:"Развлечения"},
  "Gallery": {de:"Galerie", ru:"Галерея"},
  "Book Now": {de:"Jetzt Buchen", ru:"Забронировать"},
  "About Us": {de:"Über Uns", ru:"О нас"},
  "Contact Us": {de:"Kontakt", ru:"Контакты"},
  "News": {de:"Neuigkeiten", ru:"Новости"},
  "Latest News": {de:"Neuigkeiten", ru:"Последние новости"},
  "Agents Login": {de:"Agenten-Login", ru:"Вход для агентов"},
  "Careers": {de:"Karriere", ru:"Вакансии"},
  "Group Bookings": {de:"Gruppenbuchungen", ru:"Групповые брони"},
  "Explore": {de:"Entdecken", ru:"Обзор"},
  "Resort": {de:"Resort", ru:"Курорт"},
  "Contact": {de:"Kontakt", ru:"Контакты"},
  "Dining": {de:"Gastronomie", ru:"Питание"},

  /* ── HOMEPAGE HERO ── */
  "Hurghada · Red Sea · Egypt": {de:"Hurghada · Rotes Meer · Ägypten", ru:"Хургада · Красное море · Египет"},
  "Where": {de:"Wo", ru:"Где"},
  "turquoise": {de:"türkisfarbenes", ru:"бирюзовая"},
  "water": {de:"Wasser", ru:"вода"},
  "meets": {de:"auf", ru:"встречает"},
  "golden sand": {de:"goldenen Sand trifft", ru:"золотой песок"},
  "Where turquoise water meets golden sand": {de:"Wo türkisfarbenes Wasser auf goldenen Sand trifft", ru:"Где бирюзовая вода встречает золотой песок"},
  "An innovative, contemporary hotel brand on a private stretch of Red Sea coastline. Six pools, an aqua park, and seven beautifully appointed room categories.": {de:"Eine innovative, moderne Hotelmarke an einem privaten Abschnitt der Rotmeerküste. Sechs Pools, ein Aquapark und sieben wunderschön ausgestattete Zimmerkategorien.", ru:"Инновационный современный отель на частном участке побережья Красного моря. Шесть бассейнов, аквапарк и семь прекрасно оборудованных категорий номеров."},
  "Scroll to explore": {de:"Scrollen zum Entdecken", ru:"Прокрутите вниз"},
  "Established 1994 · Red Sea": {de:"Gegründet 1994 · Rotes Meer", ru:"Основан в 1994 · Красное море"},

  /* ── COMMON EYEBROWS / HEADINGS ── */
  "Welcome to Golden Beach": {de:"Willkommen im Golden Beach", ru:"Добро пожаловать в Golden Beach"},
  "What sets us apart": {de:"Was uns auszeichnet", ru:"Что нас отличает"},
  "Our Rooms": {de:"Unsere Zimmer", ru:"Наши номера"},
  "The Beach": {de:"Der Strand", ru:"Пляж"},
  "Guest Stories": {de:"Gästestimmen", ru:"Отзывы гостей"},
  "Stay in touch": {de:"In Kontakt bleiben", ru:"Будьте на связи"},
  "Accommodation": {de:"Unterkunft", ru:"Размещение"},
  "Choose Your Room": {de:"Wählen Sie Ihr Zimmer", ru:"Выберите номер"},
  "Reservations": {de:"Reservierungen", ru:"Бронирование"},
  "More Options": {de:"Weitere Optionen", ru:"Другие варианты"},
  "Dining & Bars": {de:"Restaurants & Bars", ru:"Рестораны и бары"},
  "International Buffet": {de:"Internationales Buffet", ru:"Международный шведский стол"},
  "Italian Restaurant": {de:"Italienisches Restaurant", ru:"Итальянский ресторан"},
  "Seafood & Grills": {de:"Meeresfrüchte & Grill", ru:"Морепродукты и гриль"},
  "Beachfront": {de:"Direkt am Strand", ru:"На берегу"},
  "Main Restaurant": {de:"Hauptrestaurant", ru:"Главный ресторан"},
  "À La Carte": {de:"À La Carte", ru:"А-ля карт"},
  "Activities & Facilities": {de:"Aktivitäten & Einrichtungen", ru:"Активности и услуги"},
  "The Shoreline": {de:"Die Küste", ru:"Береговая линия"},
  "Pool Complex": {de:"Poolanlage", ru:"Бассейновый комплекс"},
  "Aqua Park": {de:"Aquapark", ru:"Аквапарк"},
  "Wellness & Sport": {de:"Wellness & Sport", ru:"Велнес и спорт"},
  "Shows & Events": {de:"Shows & Events", ru:"Шоу и события"},
  "Every Evening": {de:"Jeden Abend", ru:"Каждый вечер"},
  "Nightly Entertainment": {de:"Abendunterhaltung", ru:"Вечерние развлечения"},
  "Pool & Beach Programme": {de:"Pool- & Strandprogramm", ru:"Программа у бассейна и на пляже"},
  "Weekly Schedule": {de:"Wochenprogramm", ru:"Расписание недели"},
  "Kids' Club": {de:"Kinderclub", ru:"Детский клуб"},
  "Photo Gallery": {de:"Fotogalerie", ru:"Фотогалерея"},
  "Resort Facilities": {de:"Resort-Einrichtungen", ru:"Услуги курорта"},
  "Aqua Park & Pools": {de:"Aquapark & Pools", ru:"Аквапарк и бассейны"},
  "Spa & Fitness": {de:"Spa & Fitness", ru:"Спа и фитнес"},
  "More Services": {de:"Weitere Dienstleistungen", ru:"Дополнительные услуги"},
  "Golden Beach Hurghada": {de:"Golden Beach Hurghada", ru:"Golden Beach Хургада"},
  "Why Guests Choose Us": {de:"Warum Gäste uns wählen", ru:"Почему гости выбирают нас"},
  "We're Here to Help": {de:"Wir sind für Sie da", ru:"Мы здесь, чтобы помочь"},
  "News & Offers": {de:"Neuigkeiten & Angebote", ru:"Новости и предложения"},
  "Spa & Wellness": {de:"Spa & Wellness", ru:"Спа и велнес"},
  "Shallow Beach": {de:"Flacher Strand", ru:"Мелководный пляж"},
  "Private Beach": {de:"Privatstrand", ru:"Частный пляж"},
  "6 Swimming Pools": {de:"6 Swimmingpools", ru:"6 бассейнов"},
  "Family Friendly": {de:"Familienfreundlich", ru:"Для всей семьи"},
  "Amazing Beach": {de:"Traumstrand", ru:"Прекрасный пляж"},

  /* ── BUTTONS / CTA ── */
  "View All Rooms": {de:"Alle Zimmer Ansehen", ru:"Все номера"},
  "Book This Room": {de:"Dieses Zimmer Buchen", ru:"Забронировать номер"},
  "Beach Activities": {de:"Strandaktivitäten", ru:"Пляжные активности"},
  "Browse Menus": {de:"Speisekarten Ansehen", ru:"Посмотреть меню"},
  "Read more": {de:"Mehr lesen", ru:"Подробнее"},
  "Subscribe": {de:"Abonnieren", ru:"Подписаться"},
  "Submit Now": {de:"Absenden", ru:"Отправить"},
  "Call Us Now": {de:"Jetzt Anrufen", ru:"Позвонить"},
  "Email Reservations": {de:"E-Mail an Reservierung", ru:"Написать в отдел брони"},
  "View details": {de:"Details ansehen", ru:"Подробнее"},

  /* ── ROOM NAMES ── */
  "Premium Room": {de:"Premium-Zimmer", ru:"Премиум номер"},
  "Sea View Room": {de:"Zimmer mit Meerblick", ru:"Номер с видом на море"},
  "Family Room Connected": {de:"Verbundenes Familienzimmer", ru:"Семейный смежный номер"},
  "Standard Family": {de:"Standard-Familienzimmer", ru:"Стандартный семейный"},
  "Sea Side View": {de:"Seitlicher Meerblick", ru:"Боковой вид на море"},
  "Standard Room": {de:"Standard-Zimmer", ru:"Стандартный номер"},
  "Economy Room": {de:"Economy-Zimmer", ru:"Эконом номер"},
  "Most Popular": {de:"Am Beliebtesten", ru:"Самый популярный"},
  "Couple's Choice": {de:"Für Paare", ru:"Выбор пар"},
  "For Families": {de:"Für Familien", ru:"Для семей"},
  "Spacious": {de:"Geräumig", ru:"Просторный"},
  "Garden & Sea": {de:"Garten & Meer", ru:"Сад и море"},
  "Classic": {de:"Klassisch", ru:"Классический"},
  "Best Value": {de:"Bester Preis", ru:"Лучшая цена"},
  "Sea View": {de:"Meerblick", ru:"Вид на море"},
  "Up to 4": {de:"Bis zu 4", ru:"До 4 гостей"},
  "From": {de:"Ab", ru:"От"},
  "/ night": {de:"/ Nacht", ru:"/ ночь"},
  "/night": {de:"/Nacht", ru:"/ночь"},

  /* ── DAYS ── */
  "Monday": {de:"Montag", ru:"Понедельник"},
  "Tuesday": {de:"Dienstag", ru:"Вторник"},
  "Wednesday": {de:"Mittwoch", ru:"Среда"},
  "Thursday": {de:"Donnerstag", ru:"Четверг"},
  "Friday": {de:"Freitag", ru:"Пятница"},
  "Saturday": {de:"Samstag", ru:"Суббота"},
  "Sunday": {de:"Sonntag", ru:"Воскресенье"},
  "Morning": {de:"Vormittag", ru:"Утро"},
  "Afternoon": {de:"Nachmittag", ru:"День"},
  "Evening": {de:"Abend", ru:"Вечер"},

  /* ── FORM ── */
  "Full Name": {de:"Vollständiger Name", ru:"Полное имя"},
  "Email Address": {de:"E-Mail-Adresse", ru:"Электронная почта"},
  "Country": {de:"Land", ru:"Страна"},
  "Message": {de:"Nachricht", ru:"Сообщение"},
  "Location": {de:"Standort", ru:"Расположение"},
  "Phone": {de:"Telefon", ru:"Телефон"},
  "Email": {de:"E-Mail", ru:"Эл. почта"},
  "Reception": {de:"Rezeption", ru:"Ресепшн"},
  "Contact Info": {de:"Kontaktinformationen", ru:"Контактная информация"},
  "Get in": {de:"Nehmen Sie", ru:"Свяжитесь"},
  "touch": {de:"Kontakt auf", ru:"с нами"},

  /* ── FOOTER ── */
  "© 2026 Golden Beach Resort. All rights reserved.": {de:"© 2026 Golden Beach Resort. Alle Rechte vorbehalten.", ru:"© 2026 Golden Beach Resort. Все права защищены."},
  "An innovative, contemporary hotel brand on Hurghada's Red Sea coast. Family-owned, family-run, and quietly proud of it since 1994.": {de:"Eine innovative, moderne Hotelmarke an Hurghadas Rotmeerküste. In Familienbesitz und familiengeführt — mit stillem Stolz seit 1994.", ru:"Инновационный современный отель на побережье Красного моря в Хургаде. Семейный бизнес с 1994 года."},

  /* ── KEY HEADLINE FRAGMENTS (em-split headings) ── */
  "Seven categories.": {de:"Sieben Kategorien.", ru:"Семь категорий."},
  "One quiet view.": {de:"Ein ruhiger Ausblick.", ru:"Один тихий вид."},
  "Seven kitchens.": {de:"Sieben Küchen.", ru:"Семь кухонь."},
  "One shared table.": {de:"Ein gemeinsamer Tisch.", ru:"Один общий стол."},
  "Half a kilometre of": {de:"Ein halber Kilometer", ru:"Полкилометра"},
  "soft, white sand.": {de:"weicher, weißer Sand.", ru:"мягкого белого песка."},
  "soft white sand": {de:"weicher weißer Sand", ru:"мягкого белого песка"},
  "Built for": {de:"Geschaffen für", ru:"Создано для"},
  "every kind": {de:"jede Art", ru:"каждого"},
  "of traveller": {de:"von Reisenden", ru:"путешественника"},
  "What our guests": {de:"Was unsere Gäste", ru:"Что говорят"},
  "say": {de:"sagen", ru:"наши гости"},
  "From the": {de:"Aus dem", ru:"Новости"},
  "resort": {de:"Resort", ru:"курорта"},
  "Quiet news,": {de:"Leise Neuigkeiten,", ru:"Тихие новости,"},
  "quietly delivered.": {de:"leise zugestellt.", ru:"доставленные тихо."},

  /* ── BOOKING MODAL ── */
  "Book Your Stay": {de:"Ihren Aufenthalt Buchen", ru:"Забронируйте проживание"},
  "Check availability & best rates at Golden Beach Resort": {de:"Verfügbarkeit & beste Preise im Golden Beach Resort prüfen", ru:"Проверьте наличие и лучшие цены в Golden Beach Resort"},
  "Room Type": {de:"Zimmertyp", ru:"Тип номера"},
  "Any room type": {de:"Beliebiger Zimmertyp", ru:"Любой тип номера"},
  "Check In": {de:"Anreise", ru:"Заезд"},
  "Check Out": {de:"Abreise", ru:"Выезд"},
  "Adults": {de:"Erwachsene", ru:"Взрослые"},
  "Children": {de:"Kinder", ru:"Дети"},
  "Check Availability": {de:"Verfügbarkeit Prüfen", ru:"Проверить наличие"},
  "Secure booking via our reservation system": {de:"Sichere Buchung über unser Reservierungssystem", ru:"Безопасное бронирование через нашу систему"},
  /* ── ROOM DETAIL ── */
  "Room Facilities": {de:"Zimmerausstattung", ru:"Удобства номера"},
  "Featured": {de:"Ausgewählte", ru:"Основные"},
  "amenities": {de:"Annehmlichkeiten", ru:"удобства"},
  "In Every Room": {de:"In Jedem Zimmer", ru:"В каждом номере"},
  "Tea & Coffee Facilities": {de:"Tee- & Kaffeezubereitung", ru:"Чай и кофе"},
  "Wi-Fi (against charge)": {de:"WLAN (gegen Gebühr)", ru:"Wi-Fi (за плату)"},
  "Safe Box": {de:"Safe", ru:"Сейф"},
  "Daily Housekeeping": {de:"Tägliche Reinigung", ru:"Ежедневная уборка"},
  "All Inclusive Concept": {de:"All-Inclusive-Konzept", ru:"Концепция «Всё включено»"},
  "Dine": {de:"Speisen Sie", ru:"Питайтесь"},
  "anywhere, anytime": {de:"überall, jederzeit", ru:"где угодно и когда угодно"},
  "Check Our Restaurants": {de:"Unsere Restaurants Ansehen", ru:"Наши рестораны"},
  "Keep Exploring": {de:"Weiter Entdecken", ru:"Продолжить осмотр"},
  "Other": {de:"Weitere", ru:"Другие"},
  "room types": {de:"Zimmertypen", ru:"типы номеров"},
  "Book This Room": {de:"Dieses Zimmer Buchen", ru:"Забронировать номер"},
  "View Details": {de:"Details Ansehen", ru:"Подробнее"},

  /* ── EXPANDED COVERAGE — full site content ── */
  "\"Absolute highlight is the Golden Beach — 200 metres flat, perfect for kids. Solid wood loungers, sun and wind protection, perfect service.\"": {de:"„Absolutes Highlight ist der Golden Beach — 200 Meter flach, perfekt für Kinder. Massive Holzliegen, Sonnen- und Windschutz, perfekter Service.“", ru:"«Безусловная изюминка — Золотой пляж: 200 метров мелководья, идеально для детей. Деревянные шезлонги, защита от солнца и ветра, безупречный сервис.»"},
  "\"Enjoyed our stay so much. Staff are friendly. Amenities are superb and well maintained. Huge area, many restaurants, rooms bigger than expected.\"": {de:"„Unser Aufenthalt war wunderbar. Das Personal ist freundlich. Die Anlagen sind hervorragend und gepflegt. Riesiges Gelände, viele Restaurants, Zimmer größer als erwartet.“", ru:"«Нам очень понравилось. Персонал дружелюбный. Удобства превосходные и ухоженные. Огромная территория, много ресторанов, номера больше, чем ожидали.»"},
  "\"Very nice and clean hotel. The garden was amazing, food as well. Rooms were spacious and clean. Beach was nice and water was clean.\"": {de:"„Sehr schönes und sauberes Hotel. Der Garten war fantastisch, das Essen ebenfalls. Die Zimmer waren geräumig und sauber. Der Strand war schön und das Wasser sauber.“", ru:"«Очень приятный и чистый отель. Сад потрясающий, еда тоже. Номера просторные и чистые. Пляж хороший, вода чистая.»"},
  ", offering an ultimate vacation concept on Hurghada's Red Sea coast. Whether beach resort, lifestyle retreat, or family playground — we are constantly redefining what a Red Sea holiday can be.": {de:", das ein einzigartiges Urlaubskonzept an Hurghadas Rotem Meer bietet. Ob Strandresort, Lifestyle-Refugium oder Familienparadies — wir definieren ständig neu, was ein Urlaub am Roten Meer sein kann.", ru:"предлагающий совершенную концепцию отдыха на побережье Красного моря в Хургаде. Будь то пляжный курорт, лайфстайл-ретрит или семейная площадка — мы постоянно переосмысливаем, каким может быть отдых на Красном море."},
  "07:00 – 10:30 daily": {de:"07:00 – 10:30 täglich", ru:"07:00 – 10:30 ежедневно"},
  "10:00–18:00 daily": {de:"10:00–18:00 täglich", ru:"10:00–18:00 ежедневно"},
  "12 slides": {de:"12 Rutschen", ru:"12 горок"},
  "12 slides for adults and kids — small thrills for big and little adventurers.": {de:"12 Rutschen für Erwachsene und Kinder — kleine Nervenkitzel für große und kleine Abenteurer.", ru:"12 горок для взрослых и детей — острые ощущения для больших и маленьких искателей приключений."},
  "12 slides.": {de:"12 Rutschen.", ru:"12 горок."},
  "12 treatment rooms, hammam, steam room, and a menu of 40+ treatments. Open daily 09:00–21:00.": {de:"12 Behandlungsräume, Hammam, Dampfbad und ein Menü mit über 40 Anwendungen. Täglich 09:00–21:00 geöffnet.", ru:"12 процедурных кабинетов, хаммам, парная и более 40 процедур в меню. Открыто ежедневно 09:00–21:00."},
  "12:00 – 22:00 daily (weather permitting)": {de:"12:00 – 22:00 täglich (wetterabhängig)", ru:"12:00 – 22:00 ежедневно (при хорошей погоде)"},
  "12:30 – 14:30 daily": {de:"12:30 – 14:30 täglich", ru:"12:30 – 14:30 ежедневно"},
  "15 slides,": {de:"15 Rutschen,", ru:"15 горок,"},
  "15 water slides": {de:"15 Wasserrutschen", ru:"15 водных горок"},
  "18:30 – 21:30 daily": {de:"18:30 – 21:30 täglich", ru:"18:30 – 21:30 ежедневно"},
  "19:00 – 22:30 · Reservation recommended": {de:"19:00 – 22:30 · Reservierung empfohlen", ru:"19:00 – 22:30 · Рекомендуется бронирование"},
  "1–2 persons": {de:"1–2 Personen", ru:"1–2 человека"},
  "2 balconies": {de:"2 Balkone", ru:"2 балкона"},
  "2 bathrooms": {de:"2 Badezimmer", ru:"2 ванные комнаты"},
  "2 single beds and 2 sofa beds (double bed on request) — same as a double room, but larger, with a side sea view or pool view and a spacious balcony.": {de:"2 Einzelbetten und 2 Schlafsofas (Doppelbett auf Anfrage) — wie ein Doppelzimmer, nur größer, mit seitlichem Meer- oder Poolblick und geräumigem Balkon.", ru:"2 односпальные и 2 диван-кровати (двуспальная по запросу) — как двухместный номер, но больше, с боковым видом на море или бассейн и просторным балконом."},
  "2 sofa beds — extra bed on request": {de:"2 Schlafsofas — Zustellbett auf Anfrage", ru:"2 диван-кровати — доп. кровать по запросу"},
  "22 m²": {de:"22 m²", ru:"22 м²"},
  "22 m² compact layout": {de:"22 m² kompaktes Layout", ru:"22 м² компактная планировка"},
  "28 m²": {de:"28 m²", ru:"28 м²"},
  "28 m² layout": {de:"28 m² Layout", ru:"28 м² планировка"},
  "28 m² · Up to 3 guests": {de:"28 m² · Bis zu 3 Gäste", ru:"28 м² · До 3 гостей"},
  "300m circuit around the aqua park": {de:"300 m Rundkurs um den Aquapark", ru:"300-метровый круг вокруг аквапарка"},
  "34 m²": {de:"34 m²", ru:"34 м²"},
  "34 m² spacious layout": {de:"34 m² geräumiges Layout", ru:"34 м² просторная планировка"},
  "34 m² · Up to 4 guests": {de:"34 m² · Bis zu 4 Gäste", ru:"34 м² · До 4 гостей"},
  "36 m²": {de:"36 m²", ru:"36 м²"},
  "36 m² single unit": {de:"36 m² Einzeleinheit", ru:"36 м² единое помещение"},
  "50 Mbps fibre, free of charge": {de:"50 Mbit/s Glasfaser, kostenlos", ru:"50 Мбит/с оптоволокно, бесплатно"},
  "500 metres of": {de:"500 Meter", ru:"500 метров"},
  "50m lap pool": {de:"50-m-Sportbecken", ru:"50-метровый бассейн"},
  "52 m²": {de:"52 m²", ru:"52 м²"},
  "52 m² across two connected units": {de:"52 m² über zwei verbundene Einheiten", ru:"52 м² в двух смежных блоках"},
  "6 Heated Pools": {de:"6 beheizte Pools", ru:"6 подогреваемых бассейнов"},
  "7 Restaurants": {de:"7 Restaurants", ru:"7 ресторанов"},
  "8 Bars": {de:"8 Bars", ru:"8 баров"},
  "A double room with a relaxing side sea view, surrounded by the resort's lush gardens. A great choice for two persons.": {de:"Ein Doppelzimmer mit entspannendem seitlichem Meerblick, umgeben von den üppigen Gärten des Resorts. Eine gute Wahl für zwei Personen.", ru:"Двухместный номер с расслабляющим боковым видом на море, окружённый пышными садами курорта. Отличный выбор для двоих."},
  "A great choice for singles or two persons. Compact, comfortable, and excellent value — with all the essential comforts of the resort.": {de:"Eine gute Wahl für Singles oder zwei Personen. Kompakt, komfortabel und preiswert — mit allen wesentlichen Annehmlichkeiten des Resorts.", ru:"Отличный выбор для одного или двоих. Компактный, удобный и выгодный — со всеми необходимыми удобствами курорта."},
  "A great choice for up to two persons, with a direct front sea view. Wake up to the Red Sea every morning from your private balcony.": {de:"Eine gute Wahl für bis zu zwei Personen mit direktem Meerblick. Wachen Sie jeden Morgen vom privaten Balkon mit Blick auf das Rote Meer auf.", ru:"Отличный выбор для двоих с прямым видом на море. Просыпайтесь каждое утро с видом на Красное море с собственного балкона."},
  "A morning, an afternoon,": {de:"Ein Morgen, ein Nachmittag,", ru:"Утро, день,"},
  "A palm tree garden with exotic trees connects every building of the resort.": {de:"Ein Palmengarten mit exotischen Bäumen verbindet jedes Gebäude des Resorts.", ru:"Пальмовый сад с экзотическими деревьями соединяет все здания курорта."},
  "A single spacious unit and a great choice for up to four persons. Ideal for families who want to stay in one open, comfortable room.": {de:"Eine einzelne geräumige Einheit und eine gute Wahl für bis zu vier Personen. Ideal für Familien, die in einem offenen, komfortablen Zimmer bleiben möchten.", ru:"Единое просторное помещение, отличный выбор для четырёх человек. Идеально для семей, желающих разместиться в одном открытом и удобном номере."},
  "A warm welcome from our family to yours.": {de:"Ein herzliches Willkommen von unserer Familie an Ihre.", ru:"Тёплый приём от нашей семьи вашей."},
  "About Us — Golden Beach Resort Hurghada": {de:"Über Uns — Golden Beach Resort Hurghada", ru:"О нас — Golden Beach Resort Хургада"},
  "Activities — Golden Beach Resort Hurghada": {de:"Aktivitäten — Golden Beach Resort Hurghada", ru:"Активности — Golden Beach Resort Хургада"},
  "Adults-only pool 18+": {de:"Pool nur für Erwachsene 18+", ru:"Бассейн только для взрослых 18+"},
  "Adults-only rooftop pool": {de:"Dachpool nur für Erwachsene", ru:"Бассейн на крыше только для взрослых"},
  "Afternoon Swim": {de:"Nachmittagsschwimmen", ru:"Дневное плавание"},
  "Air conditioning": {de:"Klimaanlage", ru:"Кондиционер"},
  "All": {de:"Alle", ru:"Все"},
  "All Premium category rooms have been renovated with new furnishings, rain showers, and smart TVs.": {de:"Alle Zimmer der Premium-Kategorie wurden mit neuer Einrichtung, Regenduschen und Smart-TVs renoviert.", ru:"Все номера категории Premium обновлены: новая мебель, тропический душ и смарт-телевизоры."},
  "All daylight hours, 7 days a week": {de:"Alle Tagesstunden, 7 Tage die Woche", ru:"Весь световой день, 7 дней в неделю"},
  "All-day cocktails, mocktails, shisha, and live acoustic music Thursday–Sunday.": {de:"Ganztägig Cocktails, alkoholfreie Drinks, Shisha und akustische Live-Musik von Donnerstag bis Sonntag.", ru:"Коктейли, безалкогольные напитки, кальян весь день и живая акустическая музыка с четверга по воскресенье."},
  "Along the full beachfront": {de:"Entlang der gesamten Strandpromenade", ru:"Вдоль всей береговой линии"},
  "An": {de:"Ein", ru:"Оазис"},
  "An oasis of": {de:"Eine Oase der", ru:"Оазис"},
  "Apr 04, 2026": {de:"04. Apr. 2026", ru:"04 апр. 2026"},
  "Apr 18, 2026": {de:"18. Apr. 2026", ru:"18 апр. 2026"},
  "Aqua Aerobics": {de:"Aqua-Aerobic", ru:"Аквааэробика"},
  "Aqua Slides": {de:"Wasserrutschen", ru:"Водные горки"},
  "Aqua aerobics": {de:"Aqua-Aerobic", ru:"Аквааэробика"},
  "Archery · Talent Show": {de:"Bogenschießen · Talentshow", ru:"Стрельба из лука · Шоу талантов"},
  "Arts & Crafts": {de:"Kunst & Handwerk", ru:"Творчество и рукоделие"},
  "Average rating": {de:"Durchschnittsbewertung", ru:"Средняя оценка"},
  "Balcony with direct sea view": {de:"Balkon mit direktem Meerblick", ru:"Балкон с прямым видом на море"},
  "Balcony with side sea view": {de:"Balkon mit seitlichem Meerblick", ru:"Балкон с боковым видом на море"},
  "Beach": {de:"Strand", ru:"Пляж"},
  "Beach Bar": {de:"Strandbar", ru:"Пляжный бар"},
  "Beach Games · Dance Class": {de:"Strandspiele · Tanzkurs", ru:"Пляжные игры · Урок танцев"},
  "Beach Restaurant": {de:"Strandrestaurant", ru:"Пляжный ресторан"},
  "Beach Volleyball Final": {de:"Beachvolleyball-Finale", ru:"Финал по пляжному волейболу"},
  "Beach Volleyball · Pool Games": {de:"Beachvolleyball · Poolspiele", ru:"Пляжный волейбол · Игры в бассейне"},
  "Beach quiet zone": {de:"Ruhezone am Strand", ru:"Тихая зона на пляже"},
  "Beach service": {de:"Strandservice", ru:"Пляжный сервис"},
  "Beach volleyball": {de:"Beachvolleyball", ru:"Пляжный волейбол"},
  "Beach, every morning 07:30 · Free": {de:"Strand, jeden Morgen 07:30 · Kostenlos", ru:"Пляж, каждое утро 07:30 · Бесплатно"},
  "Book 60 days in advance for stays March through May and enjoy 20% off best available rates.": {de:"Buchen Sie 60 Tage im Voraus für Aufenthalte von März bis Mai und sparen Sie 20% auf die besten verfügbaren Raten.", ru:"Забронируйте за 60 дней для проживания с марта по май и получите скидку 20% от лучших тарифов."},
  "Book seven nights, pay for five. Available across all room categories for arrivals between 1 July and 31 August.": {de:"Sieben Nächte buchen, fünf bezahlen. Verfügbar in allen Zimmerkategorien für Anreisen zwischen dem 1. Juli und 31. August.", ru:"Бронируйте семь ночей, платите за пять. Доступно для всех категорий номеров при заезде с 1 июля по 31 августа."},
  "Bouquet": {de:"Bouquet", ru:"Bouquet"},
  "Breakfast": {de:"Frühstück", ru:"Завтрак"},
  "Built around": {de:"Erbaut rund um", ru:"Построен вокруг"},
  "Business Centre": {de:"Business-Center", ru:"Бизнес-центр"},
  "Cabaret & Variety Show": {de:"Kabarett & Varieté-Show", ru:"Кабаре и эстрадное шоу"},
  "Café Lotus": {de:"Café Lotus", ru:"Кафе «Лотос»"},
  "Charcoal grill": {de:"Holzkohlegrill", ru:"Гриль на углях"},
  "Check out the variety of our room types — from a sea-view balcony at sunrise to a connected family suite with two bathrooms.": {de:"Entdecken Sie die Vielfalt unserer Zimmertypen — vom Balkon mit Meerblick bei Sonnenaufgang bis zur verbundenen Familiensuite mit zwei Bädern.", ru:"Откройте для себя разнообразие наших номеров — от балкона с видом на море на рассвете до смежного семейного люкса с двумя ванными."},
  "Children put on their own show every Friday evening — parents invited, costumes provided.": {de:"Kinder führen jeden Freitagabend ihre eigene Show auf — Eltern sind eingeladen, Kostüme werden gestellt.", ru:"Каждую пятницу вечером дети устраивают собственное шоу — родители приглашены, костюмы предоставляются."},
  "Cinema Under the Stars": {de:"Kino unter den Sternen", ru:"Кино под звёздами"},
  "Cocktails, mocktails, shisha": {de:"Cocktails, alkoholfreie Drinks, Shisha", ru:"Коктейли, безалкогольные напитки, кальян"},
  "Cold beers, ice cream, and freshly blended smoothies, served directly to your sunbed.": {de:"Kühle Biere, Eis und frisch gemixte Smoothies, direkt an Ihre Liege serviert.", ru:"Холодное пиво, мороженое и свежие смузи — прямо к вашему шезлонгу."},
  "Complimentary for all guests": {de:"Kostenlos für alle Gäste", ru:"Бесплатно для всех гостей"},
  "Complimentary sunbeds": {de:"Kostenlose Sonnenliegen", ru:"Бесплатные шезлонги"},
  "Conference room, fax service, and business facilities for working travellers.": {de:"Konferenzraum, Faxservice und Geschäftseinrichtungen für berufstätige Reisende.", ru:"Конференц-зал, факс и бизнес-услуги для деловых путешественников."},
  "Connecting": {de:"Verbindend", ru:"Смежные"},
  "Connecting door": {de:"Verbindungstür", ru:"Смежная дверь"},
  "Connecting rooms, kids' clubs, and a heated aqua park designed for laughter.": {de:"Verbindungszimmer, Kinderclubs und ein beheizter Aquapark für viel Gelächter.", ru:"Смежные номера, детские клубы и подогреваемый аквапарк, созданный для смеха."},
  "Contact Us — Golden Beach Resort Hurghada": {de:"Kontakt — Golden Beach Resort Hurghada", ru:"Контакты — Golden Beach Resort Хургада"},
  "Contact our reservations team directly for best available rates, group bookings, or special requests.": {de:"Kontaktieren Sie unser Reservierungsteam direkt für die besten verfügbaren Raten, Gruppenbuchungen oder Sonderwünsche.", ru:"Свяжитесь с отделом бронирования напрямую для получения лучших тарифов, групповых броней или особых пожеланий."},
  "Cooking Demo · Crafts": {de:"Kochvorführung · Basteln", ru:"Кулинарный мастер-класс · Рукоделие"},
  "Craft & cooking workshops": {de:"Bastel- & Kochworkshops", ru:"Мастер-классы по рукоделию и кулинарии"},
  "Craft Workshop · Trivia Quiz": {de:"Bastelworkshop · Quiz", ru:"Мастер-класс · Викторина"},
  "Crafted with": {de:"Gefertigt mit", ru:"Создано с"},
  "Curated selection of 40+ labels": {de:"Kuratierte Auswahl von über 40 Weinen", ru:"Подобранная коллекция из 40+ марок"},
  "Czech Republic": {de:"Tschechische Republik", ru:"Чехия"},
  "Czech Republic · TripAdvisor": {de:"Tschechische Republik · TripAdvisor", ru:"Чехия · TripAdvisor"},
  "DE": {de:"DE", ru:"DE"},
  "Daily 10:30 & 16:00 at the main pool": {de:"Täglich 10:30 & 16:00 am Hauptpool", ru:"Ежедневно 10:30 и 16:00 у главного бассейна"},
  "Daily creative workshops with painting, sculpture, and Egyptian-themed make-and-take projects.": {de:"Tägliche kreative Workshops mit Malerei, Bildhauerei und ägyptisch inspirierten Bastelprojekten.", ru:"Ежедневные творческие мастер-классы: живопись, лепка и проекты в египетском стиле."},
  "Daily tournament 11:00, prizes for winners": {de:"Tägliches Turnier 11:00, Preise für Gewinner", ru:"Ежедневный турнир в 11:00, призы победителям"},
  "Daytime Activities": {de:"Tagesaktivitäten", ru:"Дневные активности"},
  "Daytime fun —": {de:"Tagesspaß —", ru:"Дневное веселье —"},
  "Dining & Bars — Golden Beach Resort Hurghada": {de:"Restaurants & Bars — Golden Beach Resort Hurghada", ru:"Рестораны и бары — Golden Beach Resort Хургада"},
  "Dinner": {de:"Abendessen", ru:"Ужин"},
  "Dinner only": {de:"Nur Abendessen", ru:"Только ужин"},
  "Direct Sea View": {de:"Direkter Meerblick", ru:"Прямой вид на море"},
  "Direct from local Hurghada fishermen": {de:"Direkt von lokalen Fischern aus Hurghada", ru:"Напрямую от местных рыбаков Хургады"},
  "Direct sea view": {de:"Direkter Meerblick", ru:"Прямой вид на море"},
  "Diving & snorkelling": {de:"Tauchen & Schnorcheln", ru:"Дайвинг и снорклинг"},
  "Diving Centre": {de:"Tauchzentrum", ru:"Дайвинг-центр"},
  "Doctor & Clinic": {de:"Arzt & Klinik", ru:"Врач и клиника"},
  "Don": {de:"Don", ru:"Don"},
  "Don Vito": {de:"Don Vito", ru:"Don Vito"},
  "Don Vito — Italian": {de:"Don Vito — Italienisch", ru:"Don Vito — Итальянский"},
  "During all daylight hours": {de:"Während aller Tagesstunden", ru:"В течение всего светового дня"},
  "EN": {de:"EN", ru:"EN"},
  "Early-bird spring rates — save 20%": {de:"Frühbucher-Frühlingsraten — 20% sparen", ru:"Весенние тарифы для ранних бронирований — скидка 20%"},
  "Economy Room — Golden Beach Resort Hurghada": {de:"Economy-Zimmer — Golden Beach Resort Hurghada", ru:"Эконом-номер — Golden Beach Resort Хургада"},
  "Egypt": {de:"Ägypten", ru:"Египет"},
  "Egyptian Folklore Night": {de:"Ägyptischer Folkloreabend", ru:"Вечер египетского фольклора"},
  "Egyptian Night": {de:"Ägyptischer Abend", ru:"Египетский вечер"},
  "Egyptian cotton 400-thread linen": {de:"Ägyptische Baumwolle, 400 Fäden", ru:"Египетский хлопок, 400 нитей"},
  "Egyptian, Italian, Seafood nights weekly": {de:"Ägyptische, italienische und Meeresfrüchte-Abende wöchentlich", ru:"Египетские, итальянские вечера и вечера морепродуктов еженедельно"},
  "Eight bars.": {de:"Acht Bars.", ru:"Восемь баров."},
  "Eight places to": {de:"Acht Orte zum", ru:"Восемь мест, чтобы"},
  "Entertainment — Golden Beach Resort Hurghada": {de:"Unterhaltung — Golden Beach Resort Hurghada", ru:"Развлечения — Golden Beach Resort Хургада"},
  "Evening Disco": {de:"Abenddisco", ru:"Вечерняя дискотека"},
  "Evening Shows": {de:"Abendshows", ru:"Вечерние шоу"},
  "Event": {de:"Veranstaltung", ru:"Событие"},
  "Every budget,": {de:"Jedes Budget,", ru:"Любой бюджет,"},
  "Every convenience is on site, so you never have to leave unless you want to.": {de:"Jeder Komfort ist vor Ort, sodass Sie das Resort nur verlassen müssen, wenn Sie möchten.", ru:"Все удобства на месте, поэтому покидать курорт нужно только по желанию."},
  "Every day,": {de:"Jeden Tag,", ru:"Каждый день,"},
  "Every room faces a garden, a pool, or the sea. All come with daily housekeeping, air-conditioning, flat-screen TV, safe, minibar, and free Wi-Fi.": {de:"Jedes Zimmer blickt auf einen Garten, einen Pool oder das Meer. Alle verfügen über täglichen Zimmerservice, Klimaanlage, Flachbild-TV, Safe, Minibar und kostenloses WLAN.", ru:"Каждый номер выходит в сад, к бассейну или на море. Во всех — ежедневная уборка, кондиционер, ТВ, сейф, мини-бар и бесплатный Wi-Fi."},
  "Every temperature.": {de:"Jede Temperatur.", ru:"Любая температура."},
  "Everything you need,": {de:"Alles, was Sie brauchen,", ru:"Всё, что нужно,"},
  "Facilities — Golden Beach Resort Hurghada": {de:"Einrichtungen — Golden Beach Resort Hurghada", ru:"Услуги — Golden Beach Resort Хургада"},
  "Family Room Connected — Golden Beach Resort Hurghada": {de:"Verbundenes Familienzimmer — Golden Beach Resort Hurghada", ru:"Смежный семейный номер — Golden Beach Resort Хургада"},
  "Family-friendly, couple-romantic, solo-restorative — all on the same shoreline.": {de:"Familienfreundlich, romantisch für Paare, erholsam für Alleinreisende — alles an derselben Küste.", ru:"Для семей, романтиков и одиночек — всё на одном берегу."},
  "Feb 28, 2026": {de:"28. Feb. 2026", ru:"28 февр. 2026"},
  "Fitness Centre": {de:"Fitnesscenter", ru:"Фитнес-центр"},
  "Fitness centre": {de:"Fitnesscenter", ru:"Фитнес-центр"},
  "Float the afternoon away": {de:"Lassen Sie den Nachmittag treiben", ru:"Проведите день на воде"},
  "Football, swimming races, volleyball, and a twice-weekly mini-Olympics with medals for all.": {de:"Fußball, Schwimmwettbewerbe, Volleyball und zweimal wöchentlich eine Mini-Olympiade mit Medaillen für alle.", ru:"Футбол, заплывы, волейбол и мини-олимпиада дважды в неделю с медалями для всех."},
  "For adults and children": {de:"Für Erwachsene und Kinder", ru:"Для взрослых и детей"},
  "For adults and children of all ages": {de:"Für Erwachsene und Kinder jeden Alters", ru:"Для взрослых и детей любого возраста"},
  "For guests with difficulty moving, we select rooms near the reception or main dining room, reachable by elevator.": {de:"Für Gäste mit eingeschränkter Mobilität wählen wir Zimmer nahe der Rezeption oder dem Hauptrestaurant, per Aufzug erreichbar.", ru:"Для гостей с ограниченной подвижностью мы подбираем номера рядом с ресепшн или главным рестораном, с доступом на лифте."},
  "France": {de:"Frankreich", ru:"Франция"},
  "Fresh daily catch": {de:"Täglich frischer Fang", ru:"Свежий улов каждый день"},
  "From 8am until sunset, every day": {de:"Von 8 Uhr bis Sonnenuntergang, jeden Tag", ru:"С 8 утра до заката, каждый день"},
  "From buffet to": {de:"Vom Buffet bis zur", ru:"От буфета до"},
  "From cosy retreats to": {de:"Von gemütlichen Refugien bis zu", ru:"От уютных номеров до"},
  "From sunrise yoga on the beach to deep-tissue massage in our tranquil spa, every form of renewal is covered.": {de:"Von Sonnenaufgangs-Yoga am Strand bis zur Tiefengewebsmassage in unserem ruhigen Spa — jede Form der Erholung ist abgedeckt.", ru:"От йоги на рассвете на пляже до глубокого массажа в нашем тихом спа — здесь есть всё для восстановления."},
  "From sunrise yoga to": {de:"Von Sonnenaufgangs-Yoga bis", ru:"От йоги на рассвете до"},
  "From the first espresso at the lobby café to the last cocktail at the beach bar, we've got every hour of the day covered.": {de:"Vom ersten Espresso im Lobby-Café bis zum letzten Cocktail an der Strandbar — wir haben jede Stunde des Tages abgedeckt.", ru:"От первого эспрессо в лобби-кафе до последнего коктейля в пляжном баре — мы заполним каждый час дня."},
  "Full salon services": {de:"Komplette Salonservices", ru:"Полный спектр салонных услуг"},
  "Full sea view": {de:"Voller Meerblick", ru:"Полный вид на море"},
  "GOLDEN BEACH": {de:"GOLDEN BEACH", ru:"GOLDEN BEACH"},
  "Gallery — Golden Beach Resort Hurghada": {de:"Galerie — Golden Beach Resort Hurghada", ru:"Галерея — Golden Beach Resort Хургада"},
  "Garden": {de:"Garten", ru:"Сад"},
  "Garden / Pool": {de:"Garten / Pool", ru:"Сад / Бассейн"},
  "Garden or swimming pool views, with the same trusted comforts as our other categories.": {de:"Garten- oder Poolblick mit demselben bewährten Komfort wie in unseren anderen Kategorien.", ru:"Вид на сад или бассейн с тем же проверенным комфортом, что и в других категориях."},
  "Garden view": {de:"Gartenblick", ru:"Вид на сад"},
  "Garden views and a cosy layout make this the smart pick for budget-conscious travellers.": {de:"Gartenblick und ein gemütliches Layout machen dies zur klugen Wahl für preisbewusste Reisende.", ru:"Вид на сад и уютная планировка делают этот номер разумным выбором для экономных путешественников."},
  "Germany": {de:"Deutschland", ru:"Германия"},
  "Germany · TripAdvisor": {de:"Deutschland · TripAdvisor", ru:"Германия · TripAdvisor"},
  "Glimpses from across the resort — from the first cup of coffee on the terrace to the last lamp in the gardens.": {de:"Eindrücke aus dem gesamten Resort — von der ersten Tasse Kaffee auf der Terrasse bis zur letzten Lampe in den Gärten.", ru:"Зарисовки со всего курорта — от первой чашки кофе на террасе до последнего фонаря в садах."},
  "Glimpses of the Red Sea combined with leafy garden surroundings make this a peaceful retreat.": {de:"Blicke auf das Rote Meer in Kombination mit grüner Gartenumgebung machen dies zu einem friedlichen Rückzugsort.", ru:"Виды на Красное море в сочетании с зеленью садов делают этот номер тихим уголком."},
  "Golden Beach Resort — Hurghada, Red Sea": {de:"Golden Beach Resort — Hurghada, Rotes Meer", ru:"Golden Beach Resort — Хургада, Красное море"},
  "Grand Amphitheatre": {de:"Großes Amphitheater", ru:"Большой амфитеатр"},
  "Guest Rooms": {de:"Gästezimmer", ru:"Гостевые номера"},
  "Guest Services": {de:"Gästeservice", ru:"Услуги для гостей"},
  "Guest reviews": {de:"Gästebewertungen", ru:"Отзывы гостей"},
  "Hair, manicure, pedicure, waxing": {de:"Haare, Maniküre, Pediküre, Waxing", ru:"Волосы, маникюр, педикюр, депиляция"},
  "Hairdryer": {de:"Haartrockner", ru:"Фен"},
  "Half a kilometre of soft white sand and crystal-clear shallows, just for guests.": {de:"Einen halben Kilometer feinen weißen Sand und kristallklares flaches Wasser, nur für Gäste.", ru:"Полкилометра мягкого белого песка и кристально чистого мелководья — только для гостей."},
  "Have any queries?": {de:"Haben Sie Fragen?", ru:"Есть вопросы?"},
  "Heated in winter, cooled in summer. Lap-lanes, kids' pools, and palm-shaded loungers.": {de:"Im Winter beheizt, im Sommer gekühlt. Schwimmbahnen, Kinderpools und palmenbeschattete Liegen.", ru:"Подогрев зимой, охлаждение летом. Дорожки для плавания, детские бассейны и шезлонги в тени пальм."},
  "Heated indoor pool": {de:"Beheiztes Hallenbad", ru:"Подогреваемый крытый бассейн"},
  "High-speed Wi-Fi": {de:"Highspeed-WLAN", ru:"Высокоскоростной Wi-Fi"},
  "Hospitality": {de:"Gastfreundschaft", ru:"Гостеприимство"},
  "Hurghada, Red Sea": {de:"Hurghada, Rotes Meer", ru:"Хургада, Красное море"},
  "International buffet · Up to 600 seats": {de:"Internationales Buffet · Bis zu 600 Plätze", ru:"Международный буфет · До 600 мест"},
  "Italian Night returns to the Beach Restaurant": {de:"Italienischer Abend kehrt ins Strandrestaurant zurück", ru:"Итальянский вечер возвращается в пляжный ресторан"},
  "Italian wine list": {de:"Italienische Weinkarte", ru:"Итальянская винная карта"},
  "Italian à la carte trattoria": {de:"Italienische à-la-carte-Trattoria", ru:"Итальянская траттория à la carte"},
  "Italy": {de:"Italien", ru:"Италия"},
  "Jan 20, 2026": {de:"20. Jan. 2026", ru:"20 янв. 2026"},
  "Juliet balcony on all floors": {de:"Juliet-Balkon auf allen Etagen", ru:"Французский балкон на всех этажах"},
  "Kayaks, pedalos, paddleboards": {de:"Kajaks, Tretboote, Paddleboards", ru:"Каяки, катамараны, сапборды"},
  "Kayaks, pedalos, paddleboards, windsurfing": {de:"Kajaks, Tretboote, Paddleboards, Windsurfen", ru:"Каяки, катамараны, сапборды, виндсёрфинг"},
  "Kettle & supplies": {de:"Wasserkocher & Zubehör", ru:"Чайник и принадлежности"},
  "Kids' disco every Tuesday and Saturday, 20:00–21:00 — glitter, glow sticks, and soft drinks.": {de:"Kinderdisco jeden Dienstag und Samstag, 20:00–21:00 — Glitzer, Knicklichter und Softdrinks.", ru:"Детская дискотека по вторникам и субботам, 20:00–21:00 — блёстки, светящиеся палочки и напитки."},
  "Kids' pool with 3 slides": {de:"Kinderpool mit 3 Rutschen", ru:"Детский бассейн с 3 горками"},
  "Kids' splash zone": {de:"Kinder-Spritzbereich", ru:"Детская зона для брызг"},
  "King bed + sofa bed": {de:"Kingsize-Bett + Schlafsofa", ru:"Кровать king-size + диван-кровать"},
  "King or twin beds": {de:"Kingsize- oder Einzelbetten", ru:"Кровать king-size или две односпальные"},
  "King-size bed": {de:"Kingsize-Bett", ru:"Кровать king-size"},
  "King-size bed + single beds": {de:"Kingsize-Bett + Einzelbetten", ru:"Кровать king-size + односпальные"},
  "King-size bed + sofa beds": {de:"Kingsize-Bett + Schlafsofas", ru:"Кровать king-size + диван-кровати"},
  "Lane swimming 06:00–08:00 daily": {de:"Bahnenschwimmen 06:00–08:00 täglich", ru:"Плавание по дорожкам 06:00–08:00 ежедневно"},
  "Laundry, taxi service, photo service, and concierge available daily.": {de:"Wäscheservice, Taxiservice, Fotoservice und Concierge täglich verfügbar.", ru:"Прачечная, такси, фотоуслуги и консьерж доступны ежедневно."},
  "Lazy river": {de:"Strömungskanal", ru:"Ленивая река"},
  "Lazy river + 2 relax pools": {de:"Strömungskanal + 2 Entspannungspools", ru:"Ленивая река + 2 бассейна для отдыха"},
  "Let us know.": {de:"Lassen Sie es uns wissen.", ru:"Дайте нам знать."},
  "Lifeguard on duty": {de:"Rettungsschwimmer im Dienst", ru:"Дежурный спасатель"},
  "Little guests,": {de:"Kleine Gäste,", ru:"Маленькие гости,"},
  "Live Band Night": {de:"Live-Band-Abend", ru:"Вечер живой музыки"},
  "Live Entertainment": {de:"Live-Unterhaltung", ru:"Живые развлечения"},
  "Live shows": {de:"Live-Shows", ru:"Живые шоу"},
  "Lobby Bar": {de:"Lobby-Bar", ru:"Лобби-бар"},
  "Lunch": {de:"Mittagessen", ru:"Обед"},
  "Lunch & dinner": {de:"Mittag- & Abendessen", ru:"Обед и ужин"},
  "Lush Gardens": {de:"Üppige Gärten", ru:"Пышные сады"},
  "Main Buffet": {de:"Hauptbuffet", ru:"Главный буфет"},
  "Main Pool": {de:"Hauptpool", ru:"Главный бассейн"},
  "Malaysia · TripAdvisor": {de:"Malaysia · TripAdvisor", ru:"Малайзия · TripAdvisor"},
  "Mar 15, 2026": {de:"15. März 2026", ru:"15 мар. 2026"},
  "Marcus & Family": {de:"Marcus & Familie", ru:"Маркус и семья"},
  "Massage treatments": {de:"Massagebehandlungen", ru:"Массажные процедуры"},
  "Max 3 or 2+2": {de:"Max. 3 oder 2+2", ru:"Макс. 3 или 2+2"},
  "Maximum 2 persons": {de:"Maximal 2 Personen", ru:"Максимум 2 человека"},
  "Maximum 3 persons or 2+1": {de:"Maximal 3 Personen oder 2+1", ru:"Максимум 3 человека или 2+1"},
  "Maximum 3 persons or 2+2": {de:"Maximal 3 Personen oder 2+2", ru:"Максимум 3 человека или 2+2"},
  "Maximum 4 persons": {de:"Maximal 4 Personen", ru:"Максимум 4 человека"},
  "Maximum 5 persons": {de:"Maximal 5 Personen", ru:"Максимум 5 человек"},
  "May 02, 2026": {de:"02. Mai 2026", ru:"02 мая 2026"},
  "Mbps Wi-Fi": {de:"Mbit/s WLAN", ru:"Мбит/с Wi-Fi"},
  "Mini Show": {de:"Mini-Show", ru:"Мини-шоу"},
  "Mini Sports": {de:"Mini-Sport", ru:"Мини-спорт"},
  "Mini bar — daily filled with water": {de:"Minibar — täglich mit Wasser gefüllt", ru:"Мини-бар — ежедневно пополняется водой"},
  "Mini bar — water, soft drinks & beer": {de:"Minibar — Wasser, Softdrinks & Bier", ru:"Мини-бар — вода, напитки и пиво"},
  "Modern gym equipment, 06:00–22:00": {de:"Moderne Fitnessgeräte, 06:00–22:00", ru:"Современное оборудование, 06:00–22:00"},
  "Monday & Thursday": {de:"Montag & Donnerstag", ru:"Понедельник и четверг"},
  "NW Hurghada": {de:"Nordwest-Hurghada", ru:"Северо-запад Хургады"},
  "NW Hurghada, Red Sea": {de:"Nordwest-Hurghada, Rotes Meer", ru:"Северо-запад Хургады, Красное море"},
  "Neapolitan-style, 11 varieties": {de:"Neapolitanischer Stil, 11 Sorten", ru:"Неаполитанская, 11 видов"},
  "Netherlands": {de:"Niederlande", ru:"Нидерланды"},
  "News — Golden Beach Resort Hurghada": {de:"News — Golden Beach Resort Hurghada", ru:"Новости — Golden Beach Resort Хургада"},
  "Non-smoking room": {de:"Nichtraucherzimmer", ru:"Номер для некурящих"},
  "Non-smoking rooms": {de:"Nichtraucherzimmer", ru:"Номера для некурящих"},
  "Offer": {de:"Angebot", ru:"Предложение"},
  "On-site PADI diving centre with daily trips to the Red Sea's famous reefs.": {de:"PADI-Tauchzentrum vor Ort mit täglichen Ausflügen zu den berühmten Riffen des Roten Meeres.", ru:"Дайвинг-центр PADI на территории с ежедневными выездами к знаменитым рифам Красного моря."},
  "On-site doctor and 24-hour medical assistance for total peace of mind.": {de:"Arzt vor Ort und medizinische Hilfe rund um die Uhr für absolute Sorglosigkeit.", ru:"Врач на территории и круглосуточная медицинская помощь для полного спокойствия."},
  "One email a season. Seasonal offers, new menus, and reef updates. Unsubscribe with a single click.": {de:"Eine E-Mail pro Saison. Saisonale Angebote, neue Menüs und Riff-Updates. Mit einem Klick abbestellen.", ru:"Одно письмо в сезон. Сезонные предложения, новые меню и новости о рифах. Отписка в один клик."},
  "One of the largest amphitheatres on the Red Sea, with shows every night.": {de:"Eines der größten Amphitheater am Roten Meer, mit Shows jeden Abend.", ru:"Один из крупнейших амфитеатров на Красном море с шоу каждый вечер."},
  "One unforgettable evening.": {de:"Ein unvergesslicher Abend.", ru:"Один незабываемый вечер."},
  "Open 24 hours, 7 days a week": {de:"24 Stunden geöffnet, 7 Tage die Woche", ru:"Открыто 24 часа, 7 дней в неделю"},
  "Open daily 09:00–21:00": {de:"Täglich 09:00–21:00 geöffnet", ru:"Открыто ежедневно 09:00–21:00"},
  "Our All-Inclusive concept covers all your food. In addition to our main restaurant, enjoy our themed à la carte restaurants — included in your package, as often as you like.": {de:"Unser All-Inclusive-Konzept deckt Ihre gesamte Verpflegung ab. Genießen Sie neben unserem Hauptrestaurant unsere themenbezogenen à-la-carte-Restaurants — in Ihrem Paket inbegriffen, so oft Sie möchten.", ru:"Наша концепция «всё включено» покрывает всё питание. Помимо главного ресторана, наслаждайтесь тематическими ресторанами à la carte — они включены в пакет, сколько угодно раз."},
  "Our Private Beach": {de:"Unser Privatstrand", ru:"Наш частный пляж"},
  "Our entertainment team runs a full seven-night programme — from live bands and belly dance shows to quiz nights and cinema under the stars.": {de:"Unser Unterhaltungsteam bietet ein komplettes Sieben-Nächte-Programm — von Live-Bands und Bauchtanzshows bis zu Quizabenden und Kino unter den Sternen.", ru:"Наша команда аниматоров проводит программу на семь вечеров — от живых групп и танца живота до викторин и кино под звёздами."},
  "Our flagship category combines generous space with the best views in the resort, ideal for couples seeking extra comfort or small families.": {de:"Unsere Flaggschiff-Kategorie verbindet großzügigen Raum mit den besten Aussichten im Resort, ideal für Paare, die zusätzlichen Komfort suchen, oder kleine Familien.", ru:"Наша флагманская категория сочетает простор и лучшие виды на курорте — идеально для пар, ищущих дополнительный комфорт, или небольших семей."},
  "Our fully-supervised Mini Club runs every day for children aged 4–12, so parents can relax while little ones make friends and memories.": {de:"Unser vollständig betreuter Mini-Club ist täglich für Kinder von 4–12 Jahren geöffnet, sodass Eltern entspannen können, während die Kleinen Freunde finden und Erinnerungen schaffen.", ru:"Наш мини-клуб с полным присмотром работает ежедневно для детей 4–12 лет, чтобы родители могли отдыхать, пока малыши заводят друзей."},
  "Our open-air amphitheatre — one of the Red Sea's largest — launches its summer programme with nightly shows.": {de:"Unser Open-Air-Amphitheater — eines der größten am Roten Meer — startet sein Sommerprogramm mit allabendlichen Shows.", ru:"Наш амфитеатр под открытым небом — один из крупнейших на Красном море — открывает летнюю программу с ежевечерними шоу."},
  "PADI-certified instructors on site": {de:"PADI-zertifizierte Instruktoren vor Ort", ru:"Инструкторы с сертификатом PADI на месте"},
  "Panoramic window, private balcony": {de:"Panoramafenster, privater Balkon", ru:"Панорамное окно, собственный балкон"},
  "Perfectly suited to couples looking for a romantic escape right on the water.": {de:"Perfekt geeignet für Paare, die eine romantische Auszeit direkt am Wasser suchen.", ru:"Идеально для пар, ищущих романтический отдых прямо у воды."},
  "Plan your": {de:"Planen Sie Ihren", ru:"Спланируйте свой"},
  "Poland": {de:"Polen", ru:"Польша"},
  "Pool & Lobby Bars": {de:"Pool- & Lobby-Bars", ru:"Бары у бассейна и в лобби"},
  "Pool Bar": {de:"Poolbar", ru:"Бар у бассейна"},
  "Pool Party · DJ Set": {de:"Poolparty · DJ-Set", ru:"Вечеринка у бассейна · DJ-сет"},
  "Pool Side": {de:"Poolbereich", ru:"У бассейна"},
  "Pools": {de:"Pools", ru:"Бассейны"},
  "Premium": {de:"Premium", ru:"Премиум"},
  "Premium Room — Golden Beach Resort Hurghada": {de:"Premium-Zimmer — Golden Beach Resort Hurghada", ru:"Премиум-номер — Golden Beach Resort Хургада"},
  "Premium Suite": {de:"Premium-Suite", ru:"Премиум-люкс"},
  "Premium rooms refreshed for 2026": {de:"Premium-Zimmer für 2026 aufgefrischt", ru:"Премиум-номера обновлены к 2026 году"},
  "Quiet location northwest of Hurghada. El Gouna approx. 10 km, Hurghada centre approx. 15 km, International Airport 20 km.": {de:"Ruhige Lage nordwestlich von Hurghada. El Gouna ca. 10 km, Zentrum von Hurghada ca. 15 km, internationaler Flughafen 20 km.", ru:"Тихое расположение к северо-западу от Хургады. Эль-Гуна ок. 10 км, центр Хургады ок. 15 км, международный аэропорт 20 км."},
  "Quiet zone, cocktail service": {de:"Ruhezone, Cocktailservice", ru:"Тихая зона, подача коктейлей"},
  "RITUALS amenities throughout": {de:"RITUALS-Pflegeprodukte überall", ru:"Косметика RITUALS повсюду"},
  "RU": {de:"RU", ru:"RU"},
  "Rain shower + tub": {de:"Regendusche + Badewanne", ru:"Тропический душ + ванна"},
  "Ready to": {de:"Bereit,", ru:"Готовы"},
  "Recharge on": {de:"Auftanken am", ru:"Восстановите силы на"},
  "Recommend us": {de:"Empfehlen uns", ru:"Рекомендуют нас"},
  "Red Sea coast": {de:"Rotmeerküste", ru:"Побережье Красного моря"},
  "Red Sea seafood & grills": {de:"Meeresfrüchte & Grillgerichte vom Roten Meer", ru:"Морепродукты и гриль Красного моря"},
  "Red Sea, Egypt": {de:"Rotes Meer, Ägypten", ru:"Красное море, Египет"},
  "Reef Snorkelling": {de:"Riff-Schnorcheln", ru:"Снорклинг у рифа"},
  "Reef restoration: our 2026 commitment": {de:"Riffrestaurierung: unser Engagement für 2026", ru:"Восстановление рифов: наше обязательство на 2026 год"},
  "Resort · Hurghada": {de:"Resort · Hurghada", ru:"Курорт · Хургада"},
  "Restaurant": {de:"Restaurant", ru:"Ресторан"},
  "Restaurants & Bars": {de:"Restaurants & Bars", ru:"Рестораны и бары"},
  "Room": {de:"Zimmer", ru:"Номер"},
  "Room Categories": {de:"Zimmerkategorien", ru:"Категории номеров"},
  "Room Service": {de:"Zimmerservice", ru:"Обслуживание номеров"},
  "Rooms — Golden Beach Resort Hurghada": {de:"Zimmer — Golden Beach Resort Hurghada", ru:"Номера — Golden Beach Resort Хургада"},
  "Russia": {de:"Russland", ru:"Россия"},
  "SAT-TV": {de:"SAT-TV", ru:"Спутниковое ТВ"},
  "Safe box": {de:"Safe", ru:"Сейф"},
  "Sauna, jacuzzi & Turkish bath": {de:"Sauna, Jacuzzi & türkisches Bad", ru:"Сауна, джакузи и турецкая баня"},
  "Sea Side View Room": {de:"Zimmer mit seitlichem Meerblick", ru:"Номер с боковым видом на море"},
  "Sea Side View Room — Golden Beach Resort Hurghada": {de:"Zimmer mit seitlichem Meerblick — Golden Beach Resort Hurghada", ru:"Номер с боковым видом на море — Golden Beach Resort Хургада"},
  "Sea View Room — Golden Beach Resort Hurghada": {de:"Zimmer mit Meerblick — Golden Beach Resort Hurghada", ru:"Номер с видом на море — Golden Beach Resort Хургада"},
  "Seafood Night": {de:"Meeresfrüchte-Abend", ru:"Вечер морепродуктов"},
  "Seafood, meats, vegetables": {de:"Meeresfrüchte, Fleisch, Gemüse", ru:"Морепродукты, мясо, овощи"},
  "Seasonal events &": {de:"Saisonale Veranstaltungen &", ru:"Сезонные события и"},
  "Seasonal events, fresh menus, and quiet little improvements around the gardens.": {de:"Saisonale Veranstaltungen, frische Menüs und kleine Verbesserungen rund um die Gärten.", ru:"Сезонные события, новые меню и небольшие улучшения в садах."},
  "Seasonal offers, new menus, and quiet little improvements around the gardens.": {de:"Saisonale Angebote, neue Menüs und kleine Verbesserungen rund um die Gärten.", ru:"Сезонные предложения, новые меню и небольшие улучшения в садах."},
  "Select your country": {de:"Land auswählen", ru:"Выберите страну"},
  "Set up daily 08:00 to sunset": {de:"Täglich von 08:00 bis Sonnenuntergang aufgebaut", ru:"Устанавливаются ежедневно с 08:00 до заката"},
  "Seven distinct dining experiences under one resort — from sunrise breakfast to midnight mezze.": {de:"Sieben unterschiedliche kulinarische Erlebnisse in einem Resort — vom Frühstück bei Sonnenaufgang bis zu Mezze um Mitternacht.", ru:"Семь разных гастрономических впечатлений на одном курорте — от завтрака на рассвете до мезе в полночь."},
  "Seven ways to sleep beside": {de:"Sieben Arten, am Roten Meer zu schlafen", ru:"Семь способов уснуть у"},
  "Shallow and supervised": {de:"Flach und beaufsichtigt", ru:"Мелко и под присмотром"},
  "Shallow water, kids' clubs, connecting rooms, and an aqua park designed for laughter.": {de:"Flaches Wasser, Kinderclubs, Verbindungszimmer und ein Aquapark für viel Gelächter.", ru:"Мелководье, детские клубы, смежные номера и аквапарк, созданный для смеха."},
  "Shallow, safe,": {de:"Flach, sicher,", ru:"Мелко, безопасно,"},
  "Shallow, supervised, with water jets": {de:"Flach, beaufsichtigt, mit Wasserdüsen", ru:"Мелко, под присмотром, с водными струями"},
  "Shopping": {de:"Einkaufen", ru:"Шопинг"},
  "Shower": {de:"Dusche", ru:"Душ"},
  "Showers & changing cabins": {de:"Duschen & Umkleidekabinen", ru:"Душевые и кабинки для переодевания"},
  "Side Sea View": {de:"Seitlicher Meerblick", ru:"Боковой вид на море"},
  "Single beds or double bed": {de:"Einzelbetten oder Doppelbett", ru:"Односпальные или двуспальная кровать"},
  "Single beds or king-size bed": {de:"Einzelbetten oder Kingsize-Bett", ru:"Односпальные или кровать king-size"},
  "Six pools.": {de:"Sechs Pools.", ru:"Шесть бассейнов."},
  "Sleeps up to 3 guests": {de:"Platz für bis zu 3 Gäste", ru:"Размещение до 3 гостей"},
  "Snorkel & dive trips": {de:"Schnorchel- & Tauchausflüge", ru:"Снорклинг и дайвинг-туры"},
  "Sofa bed — extra bed on request": {de:"Schlafsofa — Zustellbett auf Anfrage", ru:"Диван-кровать — доп. кровать по запросу"},
  "Something on,": {de:"Immer etwas los,", ru:"Всегда что-то есть,"},
  "Spa & Massage": {de:"Spa & Massage", ru:"Спа и массаж"},
  "Spacious balcony or terrace": {de:"Geräumiger Balkon oder Terrasse", ru:"Просторный балкон или терраса"},
  "Spacious balcony, side sea view": {de:"Geräumiger Balkon, seitlicher Meerblick", ru:"Просторный балкон, боковой вид на море"},
  "Spacious terrace or balcony": {de:"Geräumige Terrasse oder Balkon", ru:"Просторная терраса или балкон"},
  "Specialty coffee, homemade pastries, and light lunch wraps from 07:00.": {de:"Spezialitätenkaffee, hausgemachtes Gebäck und leichte Lunch-Wraps ab 07:00.", ru:"Спешелти-кофе, домашняя выпечка и лёгкие ланч-роллы с 07:00."},
  "Sports Courts": {de:"Sportplätze", ru:"Спортивные площадки"},
  "Standard Family Room": {de:"Standard-Familienzimmer", ru:"Стандартный семейный номер"},
  "Standard Family Room — Golden Beach Resort Hurghada": {de:"Standard-Familienzimmer — Golden Beach Resort Hurghada", ru:"Стандартный семейный номер — Golden Beach Resort Хургада"},
  "Standard Room — Golden Beach Resort Hurghada": {de:"Standard-Zimmer — Golden Beach Resort Hurghada", ru:"Стандартный номер — Golden Beach Resort Хургада"},
  "State-of-the-art Technogym equipment, free weights, spin studio, and personal training. 06:00–22:00.": {de:"Modernste Technogym-Geräte, Freihanteln, Spinning-Studio und Personal Training. 06:00–22:00.", ru:"Современное оборудование Technogym, свободные веса, сайкл-студия и персональные тренировки. 06:00–22:00."},
  "Summer Stay 7-for-5 — book by June": {de:"Sommeraufenthalt 7-für-5 — bis Juni buchen", ru:"Летнее проживание 7 по цене 5 — бронируйте до июня"},
  "Summer amphitheatre season opens June 1": {de:"Sommer-Amphitheatersaison beginnt am 1. Juni", ru:"Летний сезон амфитеатра открывается 1 июня"},
  "Sun beds, umbrellas & towels": {de:"Sonnenliegen, Schirme & Handtücher", ru:"Шезлонги, зонты и полотенца"},
  "Sunrise Yoga · Aqua Aerobics": {de:"Sonnenaufgangs-Yoga · Aqua-Aerobic", ru:"Йога на рассвете · Аквааэробика"},
  "Sunrise Yoga · Aqua Gym": {de:"Sonnenaufgangs-Yoga · Aqua-Gym", ru:"Йога на рассвете · Аква-гим"},
  "Sunrise Yoga · Family Games": {de:"Sonnenaufgangs-Yoga · Familienspiele", ru:"Йога на рассвете · Семейные игры"},
  "Sunrise Yoga · Pool Aerobics": {de:"Sonnenaufgangs-Yoga · Pool-Aerobic", ru:"Йога на рассвете · Аэробика в бассейне"},
  "Sunrise Yoga · Pool Tournament": {de:"Sonnenaufgangs-Yoga · Poolturnier", ru:"Йога на рассвете · Турнир в бассейне"},
  "Sunrise yoga": {de:"Sonnenaufgangs-Yoga", ru:"Йога на рассвете"},
  "Sunset Hour": {de:"Sonnenuntergangsstunde", ru:"Час заката"},
  "Sunset views, cocktail service": {de:"Sonnenuntergangsblick, Cocktailservice", ru:"Виды заката, подача коктейлей"},
  "Supermarket, gold shop, and souvenir shop right inside the resort.": {de:"Supermarkt, Goldgeschäft und Souvenirladen direkt im Resort.", ru:"Супермаркет, ювелирный и сувенирный магазины прямо на курорте."},
  "Supervised mini-camp for ages 4–12, with art, games, and sports. Every day 09:00–17:00.": {de:"Betreutes Mini-Camp für 4–12-Jährige mit Kunst, Spielen und Sport. Täglich 09:00–17:00.", ru:"Мини-лагерь с присмотром для детей 4–12 лет: творчество, игры и спорт. Ежедневно 09:00–17:00."},
  "Swedish, deep tissue, hot stone & more": {de:"Schwedisch, Tiefengewebe, Hot Stone & mehr", ru:"Шведский, глубокий, горячими камнями и др."},
  "Swim-up bar with frozen cocktails, fresh juices, and light bites. Open 10:00–sunset.": {de:"Swim-up-Bar mit Frozen Cocktails, frischen Säften und kleinen Snacks. Geöffnet 10:00–Sonnenuntergang.", ru:"Бар у бассейна с замороженными коктейлями, свежими соками и закусками. Открыто 10:00–закат."},
  "Tanja": {de:"Tanja", ru:"Таня"},
  "Telephone": {de:"Telefon", ru:"Телефон"},
  "The": {de:"Das", ru:"Сеть"},
  "The Bouquet": {de:"The Bouquet", ru:"The Bouquet"},
  "The Golden Beach Family": {de:"Die Golden-Beach-Familie", ru:"Семья Golden Beach"},
  "The Golden Beach is an innovative, contemporary hotel brand": {de:"Das Golden Beach ist eine innovative, zeitgemäße Hotelmarke", ru:"Golden Beach — это инновационный, современный гостиничный бренд"},
  "The connecting door lets families stay together while giving everyone their own space.": {de:"Die Verbindungstür lässt Familien zusammenbleiben und gibt dennoch jedem seinen eigenen Raum.", ru:"Смежная дверь позволяет семьям быть вместе, давая каждому собственное пространство."},
  "Themed evenings": {de:"Themenabende", ru:"Тематические вечера"},
  "There are 192 Standard Rooms in the resort, all spacious and comfortable for up to three persons — suitable for a family with one child. These rooms have garden or swimming pool views.": {de:"Es gibt 192 Standardzimmer im Resort, alle geräumig und komfortabel für bis zu drei Personen — geeignet für eine Familie mit einem Kind. Diese Zimmer bieten Garten- oder Poolblick.", ru:"На курорте 192 стандартных номера, все просторные и удобные для трёх человек — подходят для семьи с одним ребёнком. Из этих номеров вид на сад или бассейн."},
  "Three decades on the": {de:"Drei Jahrzehnte am", ru:"Три десятилетия на"},
  "To El Gouna": {de:"Nach El Gouna", ru:"До Эль-Гуны"},
  "To Hurghada Centre": {de:"Zum Zentrum von Hurghada", ru:"До центра Хургады"},
  "To Int'l Airport": {de:"Zum internationalen Flughafen", ru:"До аэропорта"},
  "To the offshore Red Sea reefs": {de:"Zu den vorgelagerten Riffen des Roten Meeres", ru:"К прибрежным рифам Красного моря"},
  "Traveller 19": {de:"Traveller 19", ru:"Traveller 19"},
  "Tues, Thurs, Sat · 15:00": {de:"Di, Do, Sa · 15:00", ru:"Вт, Чт, Сб · 15:00"},
  "Tuesday & Sunday": {de:"Dienstag & Sonntag", ru:"Вторник и воскресенье"},
  "Two connected units forming a spacious family suite — a great choice for up to five persons, with a separate room for the children and two bathrooms.": {de:"Zwei verbundene Einheiten bilden eine geräumige Familiensuite — eine gute Wahl für bis zu fünf Personen, mit einem separaten Zimmer für die Kinder und zwei Bädern.", ru:"Два смежных блока образуют просторный семейный люкс — отличный выбор для пяти человек, с отдельной детской комнатой и двумя ванными."},
  "Two tennis courts, beach volleyball, table tennis, and a half-court basketball area. Rackets available.": {de:"Zwei Tennisplätze, Beachvolleyball, Tischtennis und ein Halbfeld-Basketballbereich. Schläger verfügbar.", ru:"Два теннисных корта, пляжный волейбол, настольный теннис и баскетбольная площадка. Ракетки в наличии."},
  "Ukraine": {de:"Ukraine", ru:"Украина"},
  "United Kingdom": {de:"Vereinigtes Königreich", ru:"Великобритания"},
  "Up to 2": {de:"Bis zu 2", ru:"До 2"},
  "Up to 3": {de:"Bis zu 3", ru:"До 3"},
  "Up to 5": {de:"Bis zu 5", ru:"До 5"},
  "Up to 6": {de:"Bis zu 6", ru:"До 6"},
  "Vito": {de:"Vito", ru:"Vito"},
  "Wake up to the Red Sea every morning. These mid-floor rooms feature a full-width picture window and a juliet balcony — ideal for two, with a sofa bed for a third guest.": {de:"Wachen Sie jeden Morgen mit Blick auf das Rote Meer auf. Diese Zimmer in mittleren Etagen verfügen über ein bodentiefes Panoramafenster und einen Juliet-Balkon — ideal für zwei, mit Schlafsofa für einen dritten Gast.", ru:"Просыпайтесь каждое утро с видом на Красное море. Эти номера на средних этажах оснащены панорамным окном во всю стену и французским балконом — идеально для двоих, с диван-кроватью для третьего гостя."},
  "Walk-in rain shower": {de:"Ebenerdige Regendusche", ru:"Тропический душ"},
  "Watersports": {de:"Wassersport", ru:"Водные виды спорта"},
  "Watersports centre": {de:"Wassersportzentrum", ru:"Центр водных видов спорта"},
  "We will clear it for you at the best. Our reservations and guest relations team replies within 24 hours.": {de:"Wir klären das bestmöglich für Sie. Unser Reservierungs- und Gästebetreuungsteam antwortet innerhalb von 24 Stunden.", ru:"Мы решим всё наилучшим образом. Наша команда бронирования и работы с гостями отвечает в течение 24 часов."},
  "We've partnered with HEPCA to plant 1,200 coral fragments on the house reef this year. Read about how guests can join.": {de:"Wir haben uns mit HEPCA zusammengetan, um dieses Jahr 1.200 Korallenfragmente am Hausriff zu pflanzen. Lesen Sie, wie Gäste mitmachen können.", ru:"Совместно с HEPCA мы посадим 1200 фрагментов кораллов на домашнем рифе в этом году. Узнайте, как гости могут присоединиться."},
  "Wednesday & Saturday": {de:"Mittwoch & Samstag", ru:"Среда и суббота"},
  "With adjacent quiet pool": {de:"Mit angrenzendem ruhigem Pool", ru:"С прилегающим тихим бассейном"},
  "Wood-fired pizza": {de:"Pizza aus dem Holzofen", ru:"Пицца на дровах"},
  "Wood-fired pizza, hand-rolled pasta, and a four-course tasting menu — every Wednesday starting May 6th.": {de:"Pizza aus dem Holzofen, handgerollte Pasta und ein viergängiges Degustationsmenü — jeden Mittwoch ab dem 6. Mai.", ru:"Пицца на дровах, паста ручной работы и дегустационное меню из четырёх блюд — каждую среду с 6 мая."},
  "Year-round swimming, 28°C": {de:"Ganzjähriges Schwimmen, 28°C", ru:"Плавание круглый год, 28°C"},
  "Years of": {de:"Jahre voller", ru:"Годы"},
  "Zero boring afternoons.": {de:"Keine langweiligen Nachmittage.", ru:"Никаких скучных дней."},
  "a different adventure": {de:"ein anderes Abenteuer", ru:"новое приключение"},
  "a night": {de:"pro Nacht", ru:"за ночь"},
  "a night.": {de:"pro Nacht.", ru:"за ночь."},
  "big adventures": {de:"große Abenteuer", ru:"большие приключения"},
  "book your stay?": {de:"Ihren Aufenthalt zu buchen?", ru:"забронировать отдых?"},
  "every family size": {de:"jede Familiengröße", ru:"любой размер семьи"},
  "every night": {de:"jede Nacht", ru:"каждый вечер"},
  "extraordinary": {de:"außergewöhnlich", ru:"необыкновенный"},
  "facilities": {de:"Einrichtungen", ru:"услуги"},
  "family suites": {de:"Familiensuiten", ru:"семейные люксы"},
  "family-perfect": {de:"familienperfekt", ru:"идеально для семьи"},
  "fresh updates": {de:"frische Neuigkeiten", ru:"свежие новости"},
  "info@goldenbeachresort.net": {de:"info@goldenbeachresort.net", ru:"info@goldenbeachresort.net"},
  "km": {de:"km", ru:"км"},
  "midnight shows": {de:"Mitternachtsshows", ru:"полуночные шоу"},
  "never stops": {de:"hört nie auf", ru:"никогда не прекращается"},
  "of the week": {de:"der Woche", ru:"недели"},
  "offering an ultimate vacation concept on Hurghada's Red Sea coast — located in a quiet spot northwest of the city, directly on a wide and beautiful beach.": {de:"das ein einzigartiges Urlaubskonzept an Hurghadas Rotmeerküste bietet — an einem ruhigen Ort nordwestlich der Stadt, direkt an einem breiten und schönen Strand.", ru:"предлагающий совершенную концепцию отдыха на побережье Красного моря в Хургаде — в тихом месте к северо-западу от города, прямо на широком и красивом пляже."},
  "on the Red Sea coast.": {de:"an der Rotmeerküste.", ru:"на побережье Красного моря."},
  "perfect week": {de:"perfekte Woche", ru:"идеальная неделя"},
  "raise a glass": {de:"anzustoßen", ru:"поднять бокал"},
  "relaxation": {de:"Entspannung", ru:"расслабление"},
  "reservation@goldenbeachresort.net": {de:"reservation@goldenbeachresort.net", ru:"reservation@goldenbeachresort.net"},
  "seven nights": {de:"sieben Nächte", ru:"семь вечеров"},
  "six pools": {de:"sechs Pools", ru:"шесть бассейнов"},
  "steps away": {de:"nur wenige Schritte entfernt", ru:"в нескольких шагах"},
  "the Red Sea": {de:"dem Roten Meer", ru:"Красным морем"},
  "vision above all": {de:"Vision über allem", ru:"видение превыше всего"},
  "vision, three decades in the making.": {de:"Vision, drei Jahrzehnte in der Entstehung.", ru:"видение, создававшееся три десятилетия."},
  "what matters": {de:"was zählt", ru:"что важно"},
  "your own terms": {de:"Ihren eigenen Bedingungen", ru:"ваших собственных условиях"},
  "à la carte": {de:"à la carte", ru:"à la carte"},
  "🌙 Egyptian Folklore Night": {de:"🌙 Ägyptischer Folkloreabend", ru:"🌙 Вечер египетского фольклора"},
  "🎬 Cinema Under the Stars": {de:"🎬 Kino unter den Sternen", ru:"🎬 Кино под звёздами"},
  "🎭 Cabaret & Variety Show": {de:"🎭 Kabarett & Varieté-Show", ru:"🎭 Кабаре и эстрадное шоу"},
  "🎶 Live Band Night": {de:"🎶 Live-Band-Abend", ru:"🎶 Вечер живой музыки"},

  /* ── FINAL paragraphs ── */
  "Tucked into the northwest curve of Hurghada, we sit ten kilometres from El Gouna, fifteen from the city centre, and twenty from Hurghada International Airport. Close enough to explore, far enough to feel away.": {de:"Eingebettet in die nordwestliche Bucht von Hurghada liegen wir zehn Kilometer von El Gouna, fünfzehn vom Stadtzentrum und zwanzig vom internationalen Flughafen Hurghada entfernt. Nah genug zum Erkunden, weit genug, um abzuschalten.", ru:"Расположенные в северо-западной части Хургады, мы находимся в десяти километрах от Эль-Гуны, пятнадцати от центра города и двадцати от международного аэропорта Хургады. Достаточно близко, чтобы исследовать, и достаточно далеко, чтобы отдохнуть."},
  "Our shoreline curves gently into the Red Sea — calm, shallow, and warm enough to swim from March through November. Sunbeds, parasols, and beach service are complimentary, and our diving centre is steps away when the reef calls.": {de:"Unsere Küste schwingt sanft ins Rote Meer — ruhig, flach und warm genug zum Schwimmen von März bis November. Sonnenliegen, Sonnenschirme und Strandservice sind kostenlos, und unser Tauchzentrum ist nur wenige Schritte entfernt, wenn das Riff ruft.", ru:"Наш берег плавно уходит в Красное море — спокойное, мелкое и тёплое для купания с марта по ноябрь. Шезлонги, зонты и пляжный сервис бесплатны, а дайвинг-центр в нескольких шагах, когда зовёт риф."},
  "From our flagship Bouquet international buffet to charcoal-grilled Red Sea fish at the Beach Restaurant, every meal is unhurried. Bars stay open until late, and our themed evenings — Egyptian, Italian, Seafood — are quiet showstoppers.": {de:"Vom Flaggschiff-Buffet Bouquet bis zum vom Holzkohlegrill stammenden Rotmeerfisch im Strandrestaurant ist jede Mahlzeit entspannt. Die Bars haben bis spät geöffnet, und unsere Themenabende — Ägyptisch, Italienisch, Meeresfrüchte — sind stille Höhepunkte.", ru:"От фирменного международного буфета Bouquet до рыбы Красного моря на углях в пляжном ресторане — каждый приём пищи неспешен. Бары работают допоздна, а тематические вечера — египетский, итальянский, морепродукты — тихие гвозди программы."},
  "Three thousand reviews. Ninety percent recommend us.": {de:"Dreitausend Bewertungen. Neunzig Prozent empfehlen uns.", ru:"Три тысячи отзывов. Девяносто процентов рекомендуют нас."},
  "Our flagship room category sits high in the main building with a full-width panoramic window overlooking the Red Sea. King or twin configuration, generous wardrobe space, and a rain shower with separate soaking tub.": {de:"Unsere Flaggschiff-Zimmerkategorie liegt hoch im Hauptgebäude mit einem bodentiefen Panoramafenster mit Blick auf das Rote Meer. King- oder Einzelbett-Konfiguration, großzügiger Schrankraum und eine Regendusche mit separater Badewanne.", ru:"Наша флагманская категория номеров расположена высоко в главном здании с панорамным окном во всю стену с видом на Красное море. Кровать king-size или две односпальные, вместительный гардероб и тропический душ с отдельной ванной."},
  "Our flagship restaurant seats 600 guests in a soaring glass-and-timber hall facing the garden. Breakfast, lunch, and dinner buffets span Egyptian street food, live pasta stations, carving stations, and a dedicated kids' corner.": {de:"Unser Flaggschiff-Restaurant bietet 600 Gästen Platz in einem hohen Glas-Holz-Saal mit Blick auf den Garten. Frühstücks-, Mittags- und Abendbuffets reichen von ägyptischem Streetfood über Live-Pasta-Stationen und Carving-Stationen bis zu einer eigenen Kinderecke.", ru:"Наш флагманский ресторан вмещает 600 гостей в просторном зале из стекла и дерева с видом на сад. Буфеты на завтрак, обед и ужин включают египетский стритфуд, станции с пастой, мясные станции и детский уголок."},
  "ITALIAN TRATTORIA": {de:"ITALIENISCHE TRATTORIA", ru:"ИТАЛЬЯНСКАЯ ТРАТТОРИЯ"},
  "Rustic-chic trattoria serving hand-rolled pasta, wood-fired pizza, and classic Italian mains. Every plate is built from imported Italian staples — buffalo mozzarella, 24-month Parmigiano, Arborio rice — and finished with Red Sea flair.": {de:"Rustikal-schicke Trattoria mit handgerollter Pasta, Pizza aus dem Holzofen und klassischen italienischen Hauptgerichten. Jeder Teller basiert auf importierten italienischen Zutaten — Büffelmozzarella, 24 Monate gereifter Parmigiano, Arborio-Reis — und wird mit Rotmeer-Flair vollendet.", ru:"Уютная траттория с пастой ручной работы, пиццей на дровах и классическими итальянскими блюдами. Каждое блюдо готовится из импортных итальянских продуктов — буйволиная моцарелла, 24-месячный пармезан, рис арборио — с ноткой Красного моря."},
  "Feet in the sand, plate full of grilled Red Sea catch. This open-air grill sits directly on our private beach — tables lit by lanterns after dark, the sound of gentle waves the only soundtrack you need.": {de:"Füße im Sand, Teller voll gegrilltem Rotmeer-Fang. Dieser Open-Air-Grill liegt direkt an unserem Privatstrand — Tische bei Einbruch der Dunkelheit von Laternen beleuchtet, das Rauschen sanfter Wellen der einzige Soundtrack, den Sie brauchen.", ru:"Ноги в песке, тарелка свежего улова Красного моря на гриле. Этот гриль под открытым небом расположен прямо на нашем частном пляже — столы освещены фонарями после заката, а шум тихих волн — единственный нужный саундтрек."},
  "Our private beach curves gently into the Red Sea — shallow, calm, and warm enough to swim from March through November. Complimentary sunbeds and parasols are set up daily from 08:00, with waiter service throughout.": {de:"Unser Privatstrand schwingt sanft ins Rote Meer — flach, ruhig und warm genug zum Schwimmen von März bis November. Kostenlose Sonnenliegen und Sonnenschirme werden täglich ab 08:00 aufgebaut, mit durchgehendem Kellnerservice.", ru:"Наш частный пляж плавно уходит в Красное море — мелкое, спокойное и тёплое для купания с марта по ноябрь. Бесплатные шезлонги и зонты устанавливаются ежедневно с 08:00, с обслуживанием официантами."},
  "Heated in winter and cooled in summer, our six pools include a 50-metre lap pool, a family pool with beach-entry, a heated indoor pool, a rooftop adults-only pool, a toddlers' splash zone, and a swim-up bar pool.": {de:"Im Winter beheizt und im Sommer gekühlt, umfassen unsere sechs Pools ein 50-Meter-Sportbecken, einen Familienpool mit Strandeinstieg, ein beheiztes Hallenbad, einen Dachpool nur für Erwachsene, einen Kleinkind-Spritzbereich und einen Swim-up-Bar-Pool.", ru:"Подогреваемые зимой и охлаждаемые летом, наши шесть бассейнов включают 50-метровый бассейн, семейный бассейн с пляжным входом, крытый подогреваемый бассейн, бассейн на крыше для взрослых, зону для малышей и бассейн с баром."},
  "Five dedicated towers house twelve slides ranging from gentle family flumes to high-speed freefall drops. The aqua park is free for all guests and runs daily from 10:00 to 18:00 throughout the summer season.": {de:"Fünf eigene Türme beherbergen zwölf Rutschen, von sanften Familienrutschen bis zu schnellen Freifall-Abfahrten. Der Aquapark ist für alle Gäste kostenlos und täglich von 10:00 bis 18:00 während der gesamten Sommersaison geöffnet.", ru:"Пять башен вмещают двенадцать горок — от спокойных семейных до скоростных горок свободного падения. Аквапарк бесплатен для всех гостей и работает ежедневно с 10:00 до 18:00 весь летний сезон."},
  "Our aqua park features 15 slides for adults and children across five towers. Six swimming pools cover every mood: an adults-only 18+ pool, a kids' pool with 3 slides, an active pool, a flooded lazy river, and two dedicated relax pools.": {de:"Unser Aquapark bietet 15 Rutschen für Erwachsene und Kinder auf fünf Türmen. Sechs Schwimmbäder decken jede Stimmung ab: ein Pool nur für Erwachsene 18+, ein Kinderpool mit 3 Rutschen, ein Aktivpool, ein Strömungskanal und zwei eigene Entspannungspools.", ru:"Наш аквапарк предлагает 15 горок для взрослых и детей на пяти башнях. Шесть бассейнов на любое настроение: бассейн для взрослых 18+, детский с 3 горками, активный бассейн, ленивая река и два бассейна для отдыха."},
  "Our wide, shallow beach is ideal for families with small children. Everything you need is provided: showers, changing cabins, sun beds, umbrellas, beach towels, a dedicated beach quiet zone, and a quiet pool nearby.": {de:"Unser breiter, flacher Strand ist ideal für Familien mit kleinen Kindern. Alles, was Sie brauchen, ist vorhanden: Duschen, Umkleidekabinen, Sonnenliegen, Sonnenschirme, Strandtücher, eine eigene Ruhezone am Strand und ein ruhiger Pool in der Nähe.", ru:"Наш широкий мелкий пляж идеален для семей с маленькими детьми. Есть всё необходимое: душевые, кабинки для переодевания, шезлонги, зонты, пляжные полотенца, тихая зона на пляже и спокойный бассейн рядом."},
  "Our spa and fitness centre is a true oasis of relaxation and wellness — massage treatments of every kind, sauna, jacuzzi, Turkish steam bath, plus a full salon offering hairdressing, manicure, pedicure, and waxing.": {de:"Unser Spa- und Fitnesscenter ist eine wahre Oase der Entspannung und des Wohlbefindens — Massagen aller Art, Sauna, Jacuzzi, türkisches Dampfbad sowie ein voller Salon mit Friseur, Maniküre, Pediküre und Waxing.", ru:"Наш спа- и фитнес-центр — настоящий оазис расслабления и здоровья: всевозможные массажи, сауна, джакузи, турецкая баня, а также полноценный салон с парикмахерскими услугами, маникюром, педикюром и депиляцией."},
  "Every night at 21:30": {de:"Jeden Abend um 21:30", ru:"Каждый вечер в 21:30"},
  "Our open-air theatre seats 500 guests under the stars. Every evening at 21:30 a full production show takes the stage — from Egyptian folkloric dance and belly dance extravaganzas to acrobatics, tribute bands, and guest comedy nights.": {de:"Unser Freilichttheater bietet 500 Gästen Platz unter den Sternen. Jeden Abend um 21:30 betritt eine große Produktionsshow die Bühne — von ägyptischem Folkloretanz und Bauchtanz-Spektakeln bis zu Akrobatik, Tribute-Bands und Gast-Comedy-Abenden.", ru:"Наш театр под открытым небом вмещает 500 гостей под звёздами. Каждый вечер в 21:30 на сцену выходит полноценное шоу — от египетских народных танцев и танца живота до акробатики, трибьют-групп и комедийных вечеров."},
  "Our animation team runs an energetic daytime programme from 10:00 poolside — aqua aerobics, beach volleyball tournaments, pool games, dance classes, cooking demos, and craft workshops keep guests of all ages engaged.": {de:"Unser Animationsteam bietet ab 10:00 ein energiegeladenes Tagesprogramm am Pool — Aqua-Aerobic, Beachvolleyball-Turniere, Poolspiele, Tanzkurse, Kochvorführungen und Bastelworkshops halten Gäste jeden Alters bei Laune.", ru:"Наша команда аниматоров проводит энергичную дневную программу с 10:00 у бассейна — аквааэробика, турниры по пляжному волейболу, игры в бассейне, уроки танцев, кулинарные шоу и мастер-классы увлекут гостей всех возрастов."},
  "The resort consists of a main building and several adjoining buildings set in a lush palm garden filled with exotic trees. It's a superb choice for a beach vacation — especially for families, thanks to the shallow water. Divers love the on-site diving centre, and the resort features an attractive pool area, one of the largest amphitheatres on the Red Sea, and extensive sports facilities.": {de:"Das Resort besteht aus einem Hauptgebäude und mehreren angrenzenden Gebäuden in einem üppigen Palmengarten voller exotischer Bäume. Es ist eine hervorragende Wahl für einen Strandurlaub — besonders für Familien, dank des flachen Wassers. Taucher lieben das Tauchzentrum vor Ort, und das Resort verfügt über einen attraktiven Poolbereich, eines der größten Amphitheater am Roten Meer und umfangreiche Sporteinrichtungen.", ru:"Курорт состоит из главного здания и нескольких прилегающих корпусов в пышном пальмовом саду с экзотическими деревьями. Это превосходный выбор для пляжного отдыха — особенно для семей благодаря мелководью. Дайверы любят местный дайвинг-центр, а на курорте есть привлекательная зона бассейнов, один из крупнейших амфитеатров на Красном море и обширные спортивные сооружения."},

  /* ── ADDED: full DE/RU coverage (new intros, labels, testimonial) ── */
  "Admin": {de:"Admin", ru:"Админ"},
  "PIZZA NIGHT": {de:"PIZZA-ABEND", ru:"ВЕЧЕР ПИЦЦЫ"},
  "\"Absolute highlight is the Golden Beach — 200 metres flat, perfect for kids. Solid wood loungers, sun and wind protection, perfect service.\"": {de:"„Das absolute Highlight ist der Golden Beach — 200 Meter flach, perfekt für Kinder. Massivholz-Liegen, Sonnen- und Windschutz, perfekter Service.“", ru:"«Безусловная изюминка — пляж Golden Beach: 200 метров мелководья, идеально для детей. Шезлонги из массива дерева, защита от солнца и ветра, безупречный сервис.»"},
  "Things To Do": {de:"Aktivitäten", ru:"Чем заняться"},
  "Land, sea, and": {de:"Land, Meer und", ru:"Суша, море и"},
  "everything between": {de:"alles dazwischen", ru:"всё между ними"},
  "Dive the house reef, ride the aqua park, or unwind with beachside yoga — there is a new way to fill every day beside the Red Sea.": {de:"Tauchen Sie am Hausriff, erleben Sie den Aquapark oder entspannen Sie bei Yoga am Strand — am Roten Meer lässt sich jeder Tag neu gestalten.", ru:"Погрузитесь к домашнему рифу, прокатитесь в аквапарке или расслабьтесь на йоге у моря — каждый день у Красного моря можно провести по-новому."},
  "On Site": {de:"Vor Ort", ru:"На территории"},
  "Every comfort,": {de:"Jeder Komfort,", ru:"Каждое удобство —"},
  "a short stroll away": {de:"nur wenige Schritte entfernt", ru:"в нескольких шагах"},
  "Six freshwater pools, a full-service spa, fitness studio, kids’ club and boutiques — the whole resort is just steps from your room.": {de:"Sechs Süßwasserpools, ein Full-Service-Spa, Fitnessstudio, Kinderclub und Boutiquen — das ganze Resort ist nur wenige Schritte von Ihrem Zimmer entfernt.", ru:"Шесть пресноводных бассейнов, спа полного цикла, фитнес-студия, детский клуб и бутики — весь курорт всего в нескольких шагах от вашего номера."},
  "In Pictures": {de:"In Bildern", ru:"В фотографиях"},
  "Every shade of": {de:"Jede Facette", ru:"Все оттенки"},
  "a Red Sea day": {de:"eines Tages am Roten Meer", ru:"дня у Красного моря"},
  "From sunrise over the marina to the glow of the evening shows — browse the moments that capture life at Golden Beach Resort.": {de:"Vom Sonnenaufgang über dem Yachthafen bis zum Glanz der Abendshows — entdecken Sie die Momente, die das Leben im Golden Beach Resort einfangen.", ru:"От рассвета над мариной до сияния вечерних шоу — взгляните на моменты, передающие жизнь Golden Beach Resort."},
  "LOBBY BAR": {de:"LOBBY-BAR", ru:"ЛОББИ-БАР"},
  "SHOWTIME": {de:"SHOWZEIT", ru:"ВРЕМЯ ШОУ"},
  "SUMMER STAGE": {de:"SOMMERBÜHNE", ru:"ЛЕТНЯЯ СЦЕНА"},
};

/* ── CMS-AUTHORED TRANSLATIONS ──
   Anything added or edited in the Admin Portal carries its own German and
   Russian wording, published under content.i18n as { "<English>": {de,ru} }.
   We merge that map on top of the built-in dictionary so newly added content
   (news posts, rooms, reviews, cards, captions…) translates just like the rest
   of the site. CMS entries override built-ins where both exist. */
/* Merge a CMS i18n map ({ "<English>": {de,ru} }) on top of the dictionary. */
function mergeI18nMap(map){
  if(!map || typeof map !== 'object') return;
  Object.keys(map).forEach(function(en){
    var t = map[en]; if(!t) return;
    var entry = DICT[en] || {};
    if(t.de && String(t.de).trim()) entry.de = String(t.de).trim();
    if(t.ru && String(t.ru).trim()) entry.ru = String(t.ru).trim();
    DICT[en] = entry;
  });
}

/* Demo (file:// or localhost): content + its translations live in localStorage.
   On the live host the server copy is merged in the init handler below. */
(function mergeFromLocalStorage(){
  try{
    var raw = localStorage.getItem('gbr_cms_content');
    if(!raw) return;
    var c = JSON.parse(raw);
    if(c && c.i18n) mergeI18nMap(c.i18n);
  }catch(e){}
})();

/* Expose for the Admin Portal's Languages panel: the merged dictionary (so it can
   show the current German/Russian as an editable default) and the merge helper.
   All translations are entered by hand in the portal — there is no machine
   translation. */
try{
  window.GBR_I18N_DICT  = DICT;
  window.GBR_MERGE_I18N = mergeI18nMap;
}catch(e){}

function applyLang(lang){
  document.documentElement.lang = lang;
  if (lang === 'en') { localStorage.setItem('gb_lang','en'); updateSwitcher('en'); return location.reload ? (window.__gbReloaded ? null : null) : null; }
  /* Whole-string elements (e.g. the homepage hero headline) are split into
     per-word <span>s for the entrance animation, so the full sentence never
     exists as a single text node and the per-node pass below can only match
     it word-by-word. Translate these as a unit first — looking up the element's
     combined text against the dictionary (incl. CMS overrides) — then rebuild
     the word-spans from the translated string so styling/animation survive. */
  document.querySelectorAll('[data-cms-herotitle], [data-i18n-whole]').forEach(el => {
    var full = el.textContent.replace(/\s+/g, ' ').trim();
    var tr = DICT[full] && DICT[full][lang];
    if (!tr) return;
    var spans = el.querySelectorAll('.word');
    if (spans.length > 1) {
      /* preserve the existing animated word-spans: split the translation across
         the same number of slots, with the last one keeping the accent class */
      var words = tr.split(/\s+/);
      var perSpan = Math.ceil(words.length / spans.length);
      spans.forEach(function (sp, i) {
        var chunk = words.slice(i * perSpan, (i + 1) * perSpan).join(' ');
        sp.textContent = chunk;
      });
      /* drop any leftover words onto the last span so nothing is lost */
      var used = perSpan * spans.length;
      if (used < words.length) {
        var last = spans[spans.length - 1];
        last.textContent = (last.textContent + ' ' + words.slice(used).join(' ')).trim();
      }
    } else {
      el.textContent = tr;
    }
    el.setAttribute('data-i18n-done', '1');
  });

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: n => {
      if (!n.nodeValue.trim() || !n.parentElement) return NodeFilter.FILTER_REJECT;
      if (['SCRIPT','STYLE'].includes(n.parentElement.tagName)) return NodeFilter.FILTER_REJECT;
      /* skip nodes inside an element already translated as a whole unit above */
      if (n.parentElement.closest('[data-i18n-done]')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(n => {
    const raw = n.nodeValue;
    const trimmed = raw.trim();
    if (DICT[trimmed] && DICT[trimmed][lang]) {
      n.nodeValue = raw.replace(trimmed, DICT[trimmed][lang]);
    }
  });
  /* placeholders */
  document.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(el=>{
    const p = el.getAttribute('placeholder');
    if (DICT[p] && DICT[p][lang]) el.setAttribute('placeholder', DICT[p][lang]);
  });
  localStorage.setItem('gb_lang', lang);
  updateSwitcher(lang);
}

function updateSwitcher(lang){
  document.querySelectorAll('.lang-switch a').forEach(a=>{
    a.classList.toggle('active', a.dataset.lang === lang);
  });
}

function setLang(lang){
  if (lang === localStorage.getItem('gb_lang')) return;
  if (lang === 'en') { localStorage.setItem('gb_lang','en'); location.reload(); return; }
  /* If switching between two non-EN languages, reload first for clean EN base */
  const current = localStorage.getItem('gb_lang') || 'en';
  if (current !== 'en') { localStorage.setItem('gb_lang', lang); location.reload(); return; }
  applyLang(lang);
}

document.addEventListener('DOMContentLoaded', ()=>{
  /* Only the public site has a language switcher. On pages without one (the
     Admin Portal loads this file purely to read the dictionary), do nothing. */
  if (!document.querySelector('.lang-switch')) return;
  /* wire switcher */
  document.querySelectorAll('.lang-switch a').forEach(a=>{
    a.addEventListener('click', e=>{ e.preventDefault(); setLang(a.dataset.lang); });
  });
  const saved = localStorage.getItem('gb_lang') || 'en';
  function start(){ if (saved !== 'en') applyLang(saved); else updateSwitcher('en'); }

  const live = /^https?:$/.test(location.protocol) &&
               !/^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$/i.test(location.hostname);
  if (live){
    /* Pull the admin-entered German/Russian from the database, merge it, then
       translate — and re-apply once more after cms-apply.js has injected any
       CMS text, so newly added content gets translated too. */
    fetch('/api/content').then(r=>r.json())
      .then(c=>{ if(c && c.i18n) mergeI18nMap(c.i18n); })
      .catch(()=>{})
      .then(()=>{ start(); if(saved !== 'en') setTimeout(()=>applyLang(saved), 700); });
  } else {
    start();
  }
});
})();
