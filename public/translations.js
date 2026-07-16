/* Golden Beach Resort — i18n EN/DE/RU
   Text-node walker: replaces known EN strings with selected language.
   Language persists via localStorage across all pages. */
(function(){
const DICT = {
  /* ── NAVIGATION ── */
  "Home": {de:"Startseite", ru:"Главная", fr:"Accueil"},
  "Rooms": {de:"Zimmer", ru:"Номера", fr:"Chambres"},
  "Outlets": {de:"Gastronomie", ru:"Рестораны", fr:"Points de restauration"},
  "Restaurants": {de:"Restaurants", ru:"Рестораны", fr:"Restaurants"},
  "Bars & Cafés": {de:"Bars & Cafés", ru:"Бары и кафе", fr:"Bars & cafés"},
  "Activities": {de:"Aktivitäten", ru:"Активности", fr:"Activités"},
  "Facilities": {de:"Einrichtungen", ru:"Услуги", fr:"Installations"},
  "Entertainment": {de:"Unterhaltung", ru:"Развлечения", fr:"Divertissement"},
  "Gallery": {de:"Galerie", ru:"Галерея", fr:"Galerie"},
  "Book Now": {de:"Jetzt Buchen", ru:"Забронировать", fr:"Réserver"},
  "About Us": {de:"Über Uns", ru:"О нас", fr:"À propos"},
  "Contact Us": {de:"Kontakt", ru:"Контакты", fr:"Nous contacter"},
  "News": {de:"Neuigkeiten", ru:"Новости", fr:"Actualités"},
  "Latest News": {de:"Neuigkeiten", ru:"Последние новости", fr:"Dernières actualités"},
  "Agents Login": {de:"Agenten-Login", ru:"Вход для агентов", fr:"Espace agences"},
  "Careers": {de:"Karriere", ru:"Вакансии", fr:"Carrières"},
  "Group Bookings": {de:"Gruppenbuchungen", ru:"Групповые брони", fr:"Réservations de groupe"},
  "Explore": {de:"Entdecken", ru:"Обзор", fr:"Explorer"},
  "Resort": {de:"Resort", ru:"Курорт", fr:"Complexe"},
  "Contact": {de:"Kontakt", ru:"Контакты", fr:"Contact"},
  "Dining": {de:"Gastronomie", ru:"Питание", fr:"Restauration"},

  /* ── HOMEPAGE HERO ── */
  "Hurghada · Red Sea · Egypt": {de:"Hurghada · Rotes Meer · Ägypten", ru:"Хургада · Красное море · Египет", fr:"Hurghada · mer Rouge · Égypte"},
  "Where": {de:"Wo", ru:"Где", fr:"Où"},
  "turquoise": {de:"türkisfarbenes", ru:"бирюзовая", fr:"turquoise"},
  "water": {de:"Wasser", ru:"вода", fr:"l'eau"},
  "meets": {de:"auf", ru:"встречает", fr:"rencontre"},
  "golden sand": {de:"goldenen Sand trifft", ru:"золотой песок", fr:"le sable doré"},
  "Where turquoise water meets golden sand": {de:"Wo türkisfarbenes Wasser auf goldenen Sand trifft", ru:"Где бирюзовая вода встречает золотой песок", fr:"Où l'eau turquoise rencontre le sable doré"},
  "An innovative, contemporary hotel brand on a private stretch of Red Sea coastline. Six pools, an aqua park, and seven beautifully appointed room categories.": {de:"Eine innovative, moderne Hotelmarke an einem privaten Abschnitt der Rotmeerküste. Sechs Pools, ein Aquapark und sieben wunderschön ausgestattete Zimmerkategorien.", ru:"Инновационный современный отель на частном участке побережья Красного моря. Шесть бассейнов, аквапарк и семь прекрасно оборудованных категорий номеров.", fr:"Une marque hôtelière innovante et contemporaine, sur une portion privée du littoral de la mer Rouge. Six piscines, un parc aquatique et sept catégories de chambres élégamment aménagées."},
  "Scroll to explore": {de:"Scrollen zum Entdecken", ru:"Прокрутите вниз", fr:"Faites défiler pour explorer"},
  "Established 1994 · Red Sea": {de:"Gegründet 1994 · Rotes Meer", ru:"Основан в 1994 · Красное море", fr:"Fondé en 1994 · mer Rouge"},

  /* ── COMMON EYEBROWS / HEADINGS ── */
  "Welcome to Golden Beach": {de:"Willkommen im Golden Beach", ru:"Добро пожаловать в Golden Beach", fr:"Bienvenue à Golden Beach"},
  "What sets us apart": {de:"Was uns auszeichnet", ru:"Что нас отличает", fr:"Ce qui nous distingue"},
  "Our Rooms": {de:"Unsere Zimmer", ru:"Наши номера", fr:"Nos chambres"},
  "The Beach": {de:"Der Strand", ru:"Пляж", fr:"La plage"},
  "Guest Stories": {de:"Gästestimmen", ru:"Отзывы гостей", fr:"Témoignages de clients"},
  "Stay in touch": {de:"In Kontakt bleiben", ru:"Будьте на связи", fr:"Restons en contact"},
  "Accommodation": {de:"Unterkunft", ru:"Размещение", fr:"Hébergement"},
  "Choose Your Room": {de:"Wählen Sie Ihr Zimmer", ru:"Выберите номер", fr:"Choisissez votre chambre"},
  "Reservations": {de:"Reservierungen", ru:"Бронирование", fr:"Réservations"},
  "More Options": {de:"Weitere Optionen", ru:"Другие варианты", fr:"Plus d'options"},
  "Dining & Bars": {de:"Restaurants & Bars", ru:"Рестораны и бары", fr:"Restauration & bars"},
  "International Buffet": {de:"Internationales Buffet", ru:"Международный шведский стол", fr:"Buffet international"},
  "Italian Restaurant": {de:"Italienisches Restaurant", ru:"Итальянский ресторан", fr:"Restaurant italien"},
  "Seafood & Grills": {de:"Meeresfrüchte & Grill", ru:"Морепродукты и гриль", fr:"Fruits de mer & grillades"},
  "Beachfront": {de:"Direkt am Strand", ru:"На берегу", fr:"En bord de plage"},
  "Main Restaurant": {de:"Hauptrestaurant", ru:"Главный ресторан", fr:"Restaurant principal"},
  "À La Carte": {de:"À La Carte", ru:"А-ля карт", fr:"À la carte"},
  "Activities & Facilities": {de:"Aktivitäten & Einrichtungen", ru:"Активности и услуги", fr:"Activités & installations"},
  "The Shoreline": {de:"Die Küste", ru:"Береговая линия", fr:"Le rivage"},
  "Pool Complex": {de:"Poolanlage", ru:"Бассейновый комплекс", fr:"Complexe de piscines"},
  "Aqua Park": {de:"Aquapark", ru:"Аквапарк", fr:"Parc aquatique"},
  "Wellness & Sport": {de:"Wellness & Sport", ru:"Велнес и спорт", fr:"Bien-être & sport"},
  "Shows & Events": {de:"Shows & Events", ru:"Шоу и события", fr:"Spectacles & événements"},
  "Every Evening": {de:"Jeden Abend", ru:"Каждый вечер", fr:"Chaque soir"},
  "Nightly Entertainment": {de:"Abendunterhaltung", ru:"Вечерние развлечения", fr:"Animations en soirée"},
  "Pool & Beach Programme": {de:"Pool- & Strandprogramm", ru:"Программа у бассейна и на пляже", fr:"Programme piscine & plage"},
  "Weekly Schedule": {de:"Wochenprogramm", ru:"Расписание недели", fr:"Programme hebdomadaire"},
  "Kids' Club": {de:"Kinderclub", ru:"Детский клуб", fr:"Club enfants"},
  "Photo Gallery": {de:"Fotogalerie", ru:"Фотогалерея", fr:"Galerie photos"},
  "Resort Facilities": {de:"Resort-Einrichtungen", ru:"Услуги курорта", fr:"Installations du complexe"},
  "Aqua Park & Pools": {de:"Aquapark & Pools", ru:"Аквапарк и бассейны", fr:"Parc aquatique & piscines"},
  "Spa & Fitness": {de:"Spa & Fitness", ru:"Спа и фитнес", fr:"Spa & remise en forme"},
  "More Services": {de:"Weitere Dienstleistungen", ru:"Дополнительные услуги", fr:"Autres services"},
  "Golden Beach Hurghada": {de:"Golden Beach Hurghada", ru:"Golden Beach Хургада", fr:"Golden Beach Hurghada"},
  "Why Guests Choose Us": {de:"Warum Gäste uns wählen", ru:"Почему гости выбирают нас", fr:"Pourquoi nos clients nous choisissent"},
  "We're Here to Help": {de:"Wir sind für Sie da", ru:"Мы здесь, чтобы помочь", fr:"Nous sommes là pour vous aider"},
  "News & Offers": {de:"Neuigkeiten & Angebote", ru:"Новости и предложения", fr:"Actualités & offres"},
  "Spa & Wellness": {de:"Spa & Wellness", ru:"Спа и велнес", fr:"Spa & bien-être"},
  "Shallow Beach": {de:"Flacher Strand", ru:"Мелководный пляж", fr:"Plage à faible profondeur"},
  "Private Beach": {de:"Privatstrand", ru:"Частный пляж", fr:"Plage privée"},
  "6 Swimming Pools": {de:"6 Swimmingpools", ru:"6 бассейнов", fr:"6 piscines"},
  "Family Friendly": {de:"Familienfreundlich", ru:"Для всей семьи", fr:"Idéal pour les familles"},
  "Amazing Beach": {de:"Traumstrand", ru:"Прекрасный пляж", fr:"Une plage magnifique"},

  /* ── BUTTONS / CTA ── */
  "View All Rooms": {de:"Alle Zimmer Ansehen", ru:"Все номера", fr:"Voir toutes les chambres"},
  "Book This Room": {de:"Dieses Zimmer Buchen", ru:"Забронировать номер", fr:"Réserver cette chambre"},
  "Beach Activities": {de:"Strandaktivitäten", ru:"Пляжные активности", fr:"Activités de plage"},
  "Browse Menus": {de:"Speisekarten Ansehen", ru:"Посмотреть меню", fr:"Consulter les menus"},
  "Read more": {de:"Mehr lesen", ru:"Подробнее", fr:"En savoir plus"},
  "Subscribe": {de:"Abonnieren", ru:"Подписаться", fr:"S'abonner"},
  "Submit Now": {de:"Absenden", ru:"Отправить", fr:"Envoyer"},
  "Call Us Now": {de:"Jetzt Anrufen", ru:"Позвонить", fr:"Appelez-nous"},
  "Email Reservations": {de:"E-Mail an Reservierung", ru:"Написать в отдел брони", fr:"Réservations par e-mail"},
  "View details": {de:"Details ansehen", ru:"Подробнее", fr:"Voir les détails"},

  /* ── ROOM NAMES ── */
  "Premium Room": {de:"Premium-Zimmer", ru:"Премиум номер", fr:"Chambre Premium"},
  "Sea View Room": {de:"Zimmer mit Meerblick", ru:"Номер с видом на море", fr:"Chambre vue mer"},
  "Family Room Connected": {de:"Verbundenes Familienzimmer", ru:"Семейный смежный номер", fr:"Chambre familiale communicante"},
  "Standard Family": {de:"Standard-Familienzimmer", ru:"Стандартный семейный", fr:"Chambre familiale standard"},
  "Sea Side View": {de:"Seitlicher Meerblick", ru:"Боковой вид на море", fr:"Vue côté mer"},
  "Standard Room": {de:"Standard-Zimmer", ru:"Стандартный номер", fr:"Chambre standard"},
  "Economy Room": {de:"Economy-Zimmer", ru:"Эконом номер", fr:"Chambre économique"},
  "Most Popular": {de:"Am Beliebtesten", ru:"Самый популярный", fr:"La plus populaire"},
  "Couple's Choice": {de:"Für Paare", ru:"Выбор пар", fr:"Le choix des couples"},
  "For Families": {de:"Für Familien", ru:"Для семей", fr:"Pour les familles"},
  "Spacious": {de:"Geräumig", ru:"Просторный", fr:"Spacieuse"},
  "Garden & Sea": {de:"Garten & Meer", ru:"Сад и море", fr:"Jardin & mer"},
  "Classic": {de:"Klassisch", ru:"Классический", fr:"Classique"},
  "Best Value": {de:"Bester Preis", ru:"Лучшая цена", fr:"Le meilleur rapport qualité-prix"},
  "Sea View": {de:"Meerblick", ru:"Вид на море", fr:"Vue mer"},
  "Up to 4": {de:"Bis zu 4", ru:"До 4 гостей", fr:"Jusqu'à 4 personnes"},
  "From": {de:"Ab", ru:"От", fr:"À partir de"},
  "/ night": {de:"/ Nacht", ru:"/ ночь", fr:"/ nuit"},
  "/night": {de:"/Nacht", ru:"/ночь", fr:"/nuit"},

  /* ── DAYS ── */
  "Monday": {de:"Montag", ru:"Понедельник", fr:"Lundi"},
  "Tuesday": {de:"Dienstag", ru:"Вторник", fr:"Mardi"},
  "Wednesday": {de:"Mittwoch", ru:"Среда", fr:"Mercredi"},
  "Thursday": {de:"Donnerstag", ru:"Четверг", fr:"Jeudi"},
  "Friday": {de:"Freitag", ru:"Пятница", fr:"Vendredi"},
  "Saturday": {de:"Samstag", ru:"Суббота", fr:"Samedi"},
  "Sunday": {de:"Sonntag", ru:"Воскресенье", fr:"Dimanche"},
  "Morning": {de:"Vormittag", ru:"Утро", fr:"Matin"},
  "Afternoon": {de:"Nachmittag", ru:"День", fr:"Après-midi"},
  "Evening": {de:"Abend", ru:"Вечер", fr:"Soir"},

  /* ── FORM ── */
  "Full Name": {de:"Vollständiger Name", ru:"Полное имя", fr:"Nom complet"},
  "Email Address": {de:"E-Mail-Adresse", ru:"Электронная почта", fr:"Adresse e-mail"},
  "Country": {de:"Land", ru:"Страна", fr:"Pays"},
  "Message": {de:"Nachricht", ru:"Сообщение", fr:"Message"},
  "Location": {de:"Standort", ru:"Расположение", fr:"Emplacement"},
  "Phone": {de:"Telefon", ru:"Телефон", fr:"Téléphone"},
  "Email": {de:"E-Mail", ru:"Эл. почта", fr:"E-mail"},
  "Reception": {de:"Rezeption", ru:"Ресепшн", fr:"Réception"},
  "Contact Info": {de:"Kontaktinformationen", ru:"Контактная информация", fr:"Coordonnées"},
  "Get in": {de:"Nehmen Sie", ru:"Свяжитесь", fr:"Prenez"},
  "touch": {de:"Kontakt auf", ru:"с нами", fr:"contact"},

  /* ── FOOTER ── */
  "© 2026 Golden Beach Resort. All rights reserved.": {de:"© 2026 Golden Beach Resort. Alle Rechte vorbehalten.", ru:"© 2026 Golden Beach Resort. Все права защищены.", fr:"© 2026 Golden Beach Resort. Tous droits réservés."},
  "An innovative, contemporary hotel brand on Hurghada's Red Sea coast. Family-owned, family-run, and quietly proud of it since 1994.": {de:"Eine innovative, moderne Hotelmarke an Hurghadas Rotmeerküste. In Familienbesitz und familiengeführt — mit stillem Stolz seit 1994.", ru:"Инновационный современный отель на побережье Красного моря в Хургаде. Семейный бизнес с 1994 года.", fr:"Une marque hôtelière innovante et contemporaine, sur le littoral de la mer Rouge à Hurghada. Une entreprise familiale, gérée en famille, qui en est discrètement fière depuis 1994."},

  /* ── KEY HEADLINE FRAGMENTS (em-split headings) ── */
  "Seven categories.": {de:"Sieben Kategorien.", ru:"Семь категорий.", fr:"Sept catégories."},
  "One quiet view.": {de:"Ein ruhiger Ausblick.", ru:"Один тихий вид.", fr:"Une même vue paisible."},
  "Seven kitchens.": {de:"Sieben Küchen.", ru:"Семь кухонь.", fr:"Sept cuisines."},
  "One shared table.": {de:"Ein gemeinsamer Tisch.", ru:"Один общий стол.", fr:"Une table partagée."},
  "Half a kilometre of": {de:"Ein halber Kilometer", ru:"Полкилометра", fr:"Un demi-kilomètre de"},
  "soft, white sand.": {de:"weicher, weißer Sand.", ru:"мягкого белого песка.", fr:"sable blanc et doux."},
  "soft white sand": {de:"weicher weißer Sand", ru:"мягкого белого песка", fr:"sable blanc et doux"},
  "Built for": {de:"Geschaffen für", ru:"Создано для", fr:"Conçu pour"},
  "every kind": {de:"jede Art", ru:"каждого", fr:"chaque type"},
  "of traveller": {de:"von Reisenden", ru:"путешественника", fr:"de voyageur"},
  "What our guests": {de:"Was unsere Gäste", ru:"Что говорят", fr:"Ce que nos clients"},
  "say": {de:"sagen", ru:"наши гости", fr:"disent"},
  "From the": {de:"Aus dem", ru:"Новости", fr:"Depuis le"},
  "resort": {de:"Resort", ru:"курорта", fr:"resort"},
  "Quiet news,": {de:"Leise Neuigkeiten,", ru:"Тихие новости,", fr:"Des nouvelles discrètes,"},
  "quietly delivered.": {de:"leise zugestellt.", ru:"доставленные тихо.", fr:"délivrées avec discrétion."},

  /* ── BOOKING MODAL ── */
  "Book Your Stay": {de:"Ihren Aufenthalt Buchen", ru:"Забронируйте проживание", fr:"Réservez votre séjour"},
  "Check availability & best rates at Golden Beach Resort": {de:"Verfügbarkeit & beste Preise im Golden Beach Resort prüfen", ru:"Проверьте наличие и лучшие цены в Golden Beach Resort", fr:"Vérifiez les disponibilités et les meilleurs tarifs au Golden Beach Resort"},
  "Room Type": {de:"Zimmertyp", ru:"Тип номера", fr:"Type de chambre"},
  "Any room type": {de:"Beliebiger Zimmertyp", ru:"Любой тип номера", fr:"Tout type de chambre"},
  "Check In": {de:"Anreise", ru:"Заезд", fr:"Arrivée"},
  "Check Out": {de:"Abreise", ru:"Выезд", fr:"Départ"},
  "Adults": {de:"Erwachsene", ru:"Взрослые", fr:"Adultes"},
  "Children": {de:"Kinder", ru:"Дети", fr:"Enfants"},
  "Check Availability": {de:"Verfügbarkeit Prüfen", ru:"Проверить наличие", fr:"Vérifier les disponibilités"},
  "Secure booking via our reservation system": {de:"Sichere Buchung über unser Reservierungssystem", ru:"Безопасное бронирование через нашу систему", fr:"Réservation sécurisée via notre système de réservation"},
  /* ── ROOM DETAIL ── */
  "Room Facilities": {de:"Zimmerausstattung", ru:"Удобства номера", fr:"Équipements de la chambre"},
  "Featured": {de:"Ausgewählte", ru:"Основные", fr:"Équipements"},
  "amenities": {de:"Annehmlichkeiten", ru:"удобства", fr:"phares"},
  "In Every Room": {de:"In Jedem Zimmer", ru:"В каждом номере", fr:"Dans chaque chambre"},
  "Tea & Coffee Facilities": {de:"Tee- & Kaffeezubereitung", ru:"Чай и кофе", fr:"Nécessaire à thé et à café"},
  "Wi-Fi (against charge)": {de:"WLAN (gegen Gebühr)", ru:"Wi-Fi (за плату)", fr:"Wi-Fi (payant)"},
  "Safe Box": {de:"Safe", ru:"Сейф", fr:"Coffre-fort"},
  "Daily Housekeeping": {de:"Tägliche Reinigung", ru:"Ежедневная уборка", fr:"Ménage quotidien"},
  "All Inclusive Concept": {de:"All-Inclusive-Konzept", ru:"Концепция «Всё включено»", fr:"Concept tout compris"},
  "Dine": {de:"Speisen Sie", ru:"Питайтесь", fr:"Dînez"},
  "anywhere, anytime": {de:"überall, jederzeit", ru:"где угодно и когда угодно", fr:"partout, à tout moment"},
  "Check Our Restaurants": {de:"Unsere Restaurants Ansehen", ru:"Наши рестораны", fr:"Découvrez nos restaurants"},
  "Keep Exploring": {de:"Weiter Entdecken", ru:"Продолжить осмотр", fr:"Continuez à explorer"},
  "Other": {de:"Weitere", ru:"Другие", fr:"Autres"},
  "room types": {de:"Zimmertypen", ru:"типы номеров", fr:"types de chambres"},
  "Book This Room": {de:"Dieses Zimmer Buchen", ru:"Забронировать номер", fr:"Réserver cette chambre"},
  "View Details": {de:"Details Ansehen", ru:"Подробнее", fr:"Voir les détails"},

  /* ── EXPANDED COVERAGE — full site content ── */
  "\"Absolute highlight is the Golden Beach — 200 metres flat, perfect for kids. Solid wood loungers, sun and wind protection, perfect service.\"": {de:"„Absolutes Highlight ist der Golden Beach — 200 Meter flach, perfekt für Kinder. Massive Holzliegen, Sonnen- und Windschutz, perfekter Service.“", ru:"«Безусловная изюминка — Золотой пляж: 200 метров мелководья, идеально для детей. Деревянные шезлонги, защита от солнца и ветра, безупречный сервис.»", fr:"« Le point fort absolu est la Golden Beach — 200 mètres de plat, parfaite pour les enfants. Transats en bois massif, protection contre le soleil et le vent, service impeccable. »"},
  "\"Enjoyed our stay so much. Staff are friendly. Amenities are superb and well maintained. Huge area, many restaurants, rooms bigger than expected.\"": {de:"„Unser Aufenthalt war wunderbar. Das Personal ist freundlich. Die Anlagen sind hervorragend und gepflegt. Riesiges Gelände, viele Restaurants, Zimmer größer als erwartet.“", ru:"«Нам очень понравилось. Персонал дружелюбный. Удобства превосходные и ухоженные. Огромная территория, много ресторанов, номера больше, чем ожидали.»", fr:"« Nous avons tellement apprécié notre séjour. Le personnel est chaleureux. Les équipements sont superbes et bien entretenus. Un immense domaine, de nombreux restaurants, des chambres plus grandes que prévu. »"},
  "\"Very nice and clean hotel. The garden was amazing, food as well. Rooms were spacious and clean. Beach was nice and water was clean.\"": {de:"„Sehr schönes und sauberes Hotel. Der Garten war fantastisch, das Essen ebenfalls. Die Zimmer waren geräumig und sauber. Der Strand war schön und das Wasser sauber.“", ru:"«Очень приятный и чистый отель. Сад потрясающий, еда тоже. Номера просторные и чистые. Пляж хороший, вода чистая.»", fr:"« Un hôtel très agréable et propre. Le jardin était magnifique, la cuisine également. Les chambres étaient spacieuses et propres. La plage était belle et l'eau limpide. »"},
  ", offering an ultimate vacation concept on Hurghada's Red Sea coast. Whether beach resort, lifestyle retreat, or family playground — we are constantly redefining what a Red Sea holiday can be.": {de:", das ein einzigartiges Urlaubskonzept an Hurghadas Rotem Meer bietet. Ob Strandresort, Lifestyle-Refugium oder Familienparadies — wir definieren ständig neu, was ein Urlaub am Roten Meer sein kann.", ru:"предлагающий совершенную концепцию отдыха на побережье Красного моря в Хургаде. Будь то пляжный курорт, лайфстайл-ретрит или семейная площадка — мы постоянно переосмысливаем, каким может быть отдых на Красном море.", fr:", offrant un concept de vacances d'exception sur la côte de la mer Rouge à Hurghada. Que ce soit comme resort balnéaire, retraite lifestyle ou paradis familial — nous redéfinissons sans cesse ce que peuvent être des vacances au bord de la mer Rouge."},
  "07:00 – 10:30 daily": {de:"07:00 – 10:30 täglich", ru:"07:00 – 10:30 ежедневно", fr:"07:00 – 10:30 tous les jours"},
  "10:00–18:00 daily": {de:"10:00–18:00 täglich", ru:"10:00–18:00 ежедневно", fr:"10:00–18:00 tous les jours"},
  "12 slides": {de:"12 Rutschen", ru:"12 горок", fr:"12 toboggans"},
  "12 slides for adults and kids — small thrills for big and little adventurers.": {de:"12 Rutschen für Erwachsene und Kinder — kleine Nervenkitzel für große und kleine Abenteurer.", ru:"12 горок для взрослых и детей — острые ощущения для больших и маленьких искателей приключений.", fr:"12 toboggans pour adultes et enfants — de petits frissons pour les grands et les petits aventuriers."},
  "12 slides.": {de:"12 Rutschen.", ru:"12 горок.", fr:"12 toboggans."},
  "12 treatment rooms, hammam, steam room, and a menu of 40+ treatments. Open daily 09:00–21:00.": {de:"12 Behandlungsräume, Hammam, Dampfbad und ein Menü mit über 40 Anwendungen. Täglich 09:00–21:00 geöffnet.", ru:"12 процедурных кабинетов, хаммам, парная и более 40 процедур в меню. Открыто ежедневно 09:00–21:00.", fr:"12 salles de soins, hammam, bain de vapeur et une carte de plus de 40 soins. Ouvert tous les jours de 09:00 à 21:00."},
  "12:00 – 22:00 daily (weather permitting)": {de:"12:00 – 22:00 täglich (wetterabhängig)", ru:"12:00 – 22:00 ежедневно (при хорошей погоде)", fr:"12:00 – 22:00 tous les jours (selon la météo)"},
  "12:30 – 14:30 daily": {de:"12:30 – 14:30 täglich", ru:"12:30 – 14:30 ежедневно", fr:"12:30 – 14:30 tous les jours"},
  "15 slides,": {de:"15 Rutschen,", ru:"15 горок,", fr:"15 toboggans,"},
  "15 water slides": {de:"15 Wasserrutschen", ru:"15 водных горок", fr:"15 toboggans aquatiques"},
  "18:30 – 21:30 daily": {de:"18:30 – 21:30 täglich", ru:"18:30 – 21:30 ежедневно", fr:"18:30 – 21:30 tous les jours"},
  "19:00 – 22:30 · Reservation recommended": {de:"19:00 – 22:30 · Reservierung empfohlen", ru:"19:00 – 22:30 · Рекомендуется бронирование", fr:"19:00 – 22:30 · Réservation recommandée"},
  "1–2 persons": {de:"1–2 Personen", ru:"1–2 человека", fr:"1 à 2 personnes"},
  "2 balconies": {de:"2 Balkone", ru:"2 балкона", fr:"2 balcons"},
  "2 bathrooms": {de:"2 Badezimmer", ru:"2 ванные комнаты", fr:"2 salles de bains"},
  "2 single beds and 2 sofa beds (double bed on request) — same as a double room, but larger, with a side sea view or pool view and a spacious balcony.": {de:"2 Einzelbetten und 2 Schlafsofas (Doppelbett auf Anfrage) — wie ein Doppelzimmer, nur größer, mit seitlichem Meer- oder Poolblick und geräumigem Balkon.", ru:"2 односпальные и 2 диван-кровати (двуспальная по запросу) — как двухместный номер, но больше, с боковым видом на море или бассейн и просторным балконом.", fr:"2 lits simples et 2 canapés-lits (lit double sur demande) — identique à une chambre double, mais plus grande, avec vue latérale sur la mer ou vue sur la piscine et un balcon spacieux."},
  "2 sofa beds — extra bed on request": {de:"2 Schlafsofas — Zustellbett auf Anfrage", ru:"2 диван-кровати — доп. кровать по запросу", fr:"2 canapés-lits — lit d'appoint sur demande"},
  "22 m²": {de:"22 m²", ru:"22 м²", fr:"22 m²"},
  "22 m² compact layout": {de:"22 m² kompaktes Layout", ru:"22 м² компактная планировка", fr:"22 m², agencement compact"},
  "28 m²": {de:"28 m²", ru:"28 м²", fr:"28 m²"},
  "28 m² layout": {de:"28 m² Layout", ru:"28 м² планировка", fr:"28 m², agencement"},
  "28 m² · Up to 3 guests": {de:"28 m² · Bis zu 3 Gäste", ru:"28 м² · До 3 гостей", fr:"28 m² · Jusqu'à 3 personnes"},
  "300m circuit around the aqua park": {de:"300 m Rundkurs um den Aquapark", ru:"300-метровый круг вокруг аквапарка", fr:"Circuit de 300 m autour du parc aquatique"},
  "34 m²": {de:"34 m²", ru:"34 м²", fr:"34 m²"},
  "34 m² spacious layout": {de:"34 m² geräumiges Layout", ru:"34 м² просторная планировка", fr:"34 m², agencement spacieux"},
  "34 m² · Up to 4 guests": {de:"34 m² · Bis zu 4 Gäste", ru:"34 м² · До 4 гостей", fr:"34 m² · Jusqu'à 4 personnes"},
  "36 m²": {de:"36 m²", ru:"36 м²", fr:"36 m²"},
  "36 m² single unit": {de:"36 m² Einzeleinheit", ru:"36 м² единое помещение", fr:"36 m², unité unique"},
  "50 Mbps fibre, free of charge": {de:"50 Mbit/s Glasfaser, kostenlos", ru:"50 Мбит/с оптоволокно, бесплатно", fr:"Fibre 50 Mbps, gratuite"},
  "500 metres of": {de:"500 Meter", ru:"500 метров", fr:"500 mètres de"},
  "50m lap pool": {de:"50-m-Sportbecken", ru:"50-метровый бассейн", fr:"Bassin de nage de 50 m"},
  "52 m²": {de:"52 m²", ru:"52 м²", fr:"52 m²"},
  "52 m² across two connected units": {de:"52 m² über zwei verbundene Einheiten", ru:"52 м² в двух смежных блоках", fr:"52 m² répartis sur deux unités communicantes"},
  "6 Heated Pools": {de:"6 beheizte Pools", ru:"6 подогреваемых бассейнов", fr:"6 piscines chauffées"},
  "7 Restaurants": {de:"7 Restaurants", ru:"7 ресторанов", fr:"7 restaurants"},
  "8 Bars": {de:"8 Bars", ru:"8 баров", fr:"8 bars"},
  "A double room with a relaxing side sea view, surrounded by the resort's lush gardens. A great choice for two persons.": {de:"Ein Doppelzimmer mit entspannendem seitlichem Meerblick, umgeben von den üppigen Gärten des Resorts. Eine gute Wahl für zwei Personen.", ru:"Двухместный номер с расслабляющим боковым видом на море, окружённый пышными садами курорта. Отличный выбор для двоих.", fr:"Une chambre double avec une vue latérale sur la mer apaisante, entourée des jardins luxuriants du resort. Un excellent choix pour deux personnes."},
  "A great choice for singles or two persons. Compact, comfortable, and excellent value — with all the essential comforts of the resort.": {de:"Eine gute Wahl für Singles oder zwei Personen. Kompakt, komfortabel und preiswert — mit allen wesentlichen Annehmlichkeiten des Resorts.", ru:"Отличный выбор для одного или двоих. Компактный, удобный и выгодный — со всеми необходимыми удобствами курорта.", fr:"Un excellent choix pour une ou deux personnes. Compacte, confortable et d'un excellent rapport qualité-prix — avec tout le confort essentiel du resort."},
  "A great choice for up to two persons, with a direct front sea view. Wake up to the Red Sea every morning from your private balcony.": {de:"Eine gute Wahl für bis zu zwei Personen mit direktem Meerblick. Wachen Sie jeden Morgen vom privaten Balkon mit Blick auf das Rote Meer auf.", ru:"Отличный выбор для двоих с прямым видом на море. Просыпайтесь каждое утро с видом на Красное море с собственного балкона.", fr:"Un excellent choix pour deux personnes, avec une vue frontale directe sur la mer. Réveillez-vous face à la mer Rouge chaque matin depuis votre balcon privé."},
  "A morning, an afternoon,": {de:"Ein Morgen, ein Nachmittag,", ru:"Утро, день,", fr:"Une matinée, un après-midi,"},
  "A palm tree garden with exotic trees connects every building of the resort.": {de:"Ein Palmengarten mit exotischen Bäumen verbindet jedes Gebäude des Resorts.", ru:"Пальмовый сад с экзотическими деревьями соединяет все здания курорта.", fr:"Un jardin de palmiers aux arbres exotiques relie chaque bâtiment du resort."},
  "A single spacious unit and a great choice for up to four persons. Ideal for families who want to stay in one open, comfortable room.": {de:"Eine einzelne geräumige Einheit und eine gute Wahl für bis zu vier Personen. Ideal für Familien, die in einem offenen, komfortablen Zimmer bleiben möchten.", ru:"Единое просторное помещение, отличный выбор для четырёх человек. Идеально для семей, желающих разместиться в одном открытом и удобном номере.", fr:"Une unité unique et spacieuse, excellent choix pour jusqu'à quatre personnes. Idéale pour les familles souhaitant séjourner dans une chambre ouverte et confortable."},
  "A warm welcome from our family to yours.": {de:"Ein herzliches Willkommen von unserer Familie an Ihre.", ru:"Тёплый приём от нашей семьи вашей.", fr:"Un accueil chaleureux de notre famille à la vôtre."},
  "About Us — Golden Beach Resort Hurghada": {de:"Über Uns — Golden Beach Resort Hurghada", ru:"О нас — Golden Beach Resort Хургада", fr:"À propos de nous — Golden Beach Resort Hurghada"},
  "Activities — Golden Beach Resort Hurghada": {de:"Aktivitäten — Golden Beach Resort Hurghada", ru:"Активности — Golden Beach Resort Хургада", fr:"Activités — Golden Beach Resort Hurghada"},
  "Adults-only pool 18+": {de:"Pool nur für Erwachsene 18+", ru:"Бассейн только для взрослых 18+", fr:"Piscine réservée aux adultes 18+"},
  "Adults-only rooftop pool": {de:"Dachpool nur für Erwachsene", ru:"Бассейн на крыше только для взрослых", fr:"Piscine sur le toit réservée aux adultes"},
  "Afternoon Swim": {de:"Nachmittagsschwimmen", ru:"Дневное плавание", fr:"Baignade de l'après-midi"},
  "Air conditioning": {de:"Klimaanlage", ru:"Кондиционер", fr:"Climatisation"},
  "All": {de:"Alle", ru:"Все", fr:"Tout"},
  "All Premium category rooms have been renovated with new furnishings, rain showers, and smart TVs.": {de:"Alle Zimmer der Premium-Kategorie wurden mit neuer Einrichtung, Regenduschen und Smart-TVs renoviert.", ru:"Все номера категории Premium обновлены: новая мебель, тропический душ и смарт-телевизоры.", fr:"Toutes les chambres de catégorie Premium ont été rénovées avec un nouveau mobilier, des douches à effet pluie et des téléviseurs connectés."},
  "All daylight hours, 7 days a week": {de:"Alle Tagesstunden, 7 Tage die Woche", ru:"Весь световой день, 7 дней в неделю", fr:"Toute la journée, 7 jours sur 7"},
  "All-day cocktails, mocktails, shisha, and live acoustic music Thursday–Sunday.": {de:"Ganztägig Cocktails, alkoholfreie Drinks, Shisha und akustische Live-Musik von Donnerstag bis Sonntag.", ru:"Коктейли, безалкогольные напитки, кальян весь день и живая акустическая музыка с четверга по воскресенье.", fr:"Cocktails, mocktails, chicha toute la journée et musique acoustique live du jeudi au dimanche."},
  "Along the full beachfront": {de:"Entlang der gesamten Strandpromenade", ru:"Вдоль всей береговой линии", fr:"Sur tout le front de mer"},
  "An": {de:"Ein", ru:"Оазис", fr:"Une"},
  "An oasis of": {de:"Eine Oase der", ru:"Оазис", fr:"Une oasis de"},
  "Apr 04, 2026": {de:"04. Apr. 2026", ru:"04 апр. 2026", fr:"04 avr. 2026"},
  "Apr 18, 2026": {de:"18. Apr. 2026", ru:"18 апр. 2026", fr:"18 avr. 2026"},
  "Aqua Aerobics": {de:"Aqua-Aerobic", ru:"Аквааэробика", fr:"Aquagym"},
  "Aqua Slides": {de:"Wasserrutschen", ru:"Водные горки", fr:"Toboggans aquatiques"},
  "Aqua aerobics": {de:"Aqua-Aerobic", ru:"Аквааэробика", fr:"Aquagym"},
  "Archery · Talent Show": {de:"Bogenschießen · Talentshow", ru:"Стрельба из лука · Шоу талантов", fr:"Tir à l'arc · Spectacle de talents"},
  "Arts & Crafts": {de:"Kunst & Handwerk", ru:"Творчество и рукоделие", fr:"Arts et loisirs créatifs"},
  "Average rating": {de:"Durchschnittsbewertung", ru:"Средняя оценка", fr:"Note moyenne"},
  "Balcony with direct sea view": {de:"Balkon mit direktem Meerblick", ru:"Балкон с прямым видом на море", fr:"Balcon avec vue directe sur la mer"},
  "Balcony with side sea view": {de:"Balkon mit seitlichem Meerblick", ru:"Балкон с боковым видом на море", fr:"Balcon avec vue latérale sur la mer"},
  "Beach": {de:"Strand", ru:"Пляж", fr:"Plage"},
  "Beach Bar": {de:"Strandbar", ru:"Пляжный бар", fr:"Bar de plage"},
  "Beach Games · Dance Class": {de:"Strandspiele · Tanzkurs", ru:"Пляжные игры · Урок танцев", fr:"Jeux de plage · Cours de danse"},
  "Beach Restaurant": {de:"Strandrestaurant", ru:"Пляжный ресторан", fr:"Restaurant de plage"},
  "Beach Volleyball Final": {de:"Beachvolleyball-Finale", ru:"Финал по пляжному волейболу", fr:"Finale de beach-volley"},
  "Beach Volleyball · Pool Games": {de:"Beachvolleyball · Poolspiele", ru:"Пляжный волейбол · Игры в бассейне", fr:"Beach-volley · Jeux de piscine"},
  "Beach quiet zone": {de:"Ruhezone am Strand", ru:"Тихая зона на пляже", fr:"Zone de calme sur la plage"},
  "Beach service": {de:"Strandservice", ru:"Пляжный сервис", fr:"Service de plage"},
  "Beach volleyball": {de:"Beachvolleyball", ru:"Пляжный волейбол", fr:"Beach-volley"},
  "Beach, every morning 07:30 · Free": {de:"Strand, jeden Morgen 07:30 · Kostenlos", ru:"Пляж, каждое утро 07:30 · Бесплатно", fr:"Plage, tous les matins à 07:30 · Gratuit"},
  "Book 60 days in advance for stays March through May and enjoy 20% off best available rates.": {de:"Buchen Sie 60 Tage im Voraus für Aufenthalte von März bis Mai und sparen Sie 20% auf die besten verfügbaren Raten.", ru:"Забронируйте за 60 дней для проживания с марта по май и получите скидку 20% от лучших тарифов.", fr:"Réservez 60 jours à l'avance pour les séjours de mars à mai et profitez de 20 % de réduction sur les meilleurs tarifs disponibles."},
  "Book seven nights, pay for five. Available across all room categories for arrivals between 1 July and 31 August.": {de:"Sieben Nächte buchen, fünf bezahlen. Verfügbar in allen Zimmerkategorien für Anreisen zwischen dem 1. Juli und 31. August.", ru:"Бронируйте семь ночей, платите за пять. Доступно для всех категорий номеров при заезде с 1 июля по 31 августа.", fr:"Réservez sept nuits, payez-en cinq. Offre valable sur toutes les catégories de chambres pour les arrivées entre le 1er juillet et le 31 août."},
  "Bouquet": {de:"Bouquet", ru:"Bouquet", fr:"Bouquet"},
  "Breakfast": {de:"Frühstück", ru:"Завтрак", fr:"Petit-déjeuner"},
  "Built around": {de:"Erbaut rund um", ru:"Построен вокруг", fr:"Conçu autour"},
  "Business Centre": {de:"Business-Center", ru:"Бизнес-центр", fr:"Centre d'affaires"},
  "Cabaret & Variety Show": {de:"Kabarett & Varieté-Show", ru:"Кабаре и эстрадное шоу", fr:"Cabaret et spectacle de variétés"},
  "Café Lotus": {de:"Café Lotus", ru:"Кафе «Лотос»", fr:"Café Lotus"},
  "Charcoal grill": {de:"Holzkohlegrill", ru:"Гриль на углях", fr:"Grillades au charbon de bois"},
  "Check out the variety of our room types — from a sea-view balcony at sunrise to a connected family suite with two bathrooms.": {de:"Entdecken Sie die Vielfalt unserer Zimmertypen — vom Balkon mit Meerblick bei Sonnenaufgang bis zur verbundenen Familiensuite mit zwei Bädern.", ru:"Откройте для себя разнообразие наших номеров — от балкона с видом на море на рассвете до смежного семейного люкса с двумя ванными.", fr:"Découvrez la variété de nos types de chambres — d'un balcon avec vue sur la mer au lever du soleil à une suite familiale communicante avec deux salles de bains."},
  "Children put on their own show every Friday evening — parents invited, costumes provided.": {de:"Kinder führen jeden Freitagabend ihre eigene Show auf — Eltern sind eingeladen, Kostüme werden gestellt.", ru:"Каждую пятницу вечером дети устраивают собственное шоу — родители приглашены, костюмы предоставляются.", fr:"Les enfants présentent leur propre spectacle chaque vendredi soir — parents invités, costumes fournis."},
  "Cinema Under the Stars": {de:"Kino unter den Sternen", ru:"Кино под звёздами", fr:"Cinéma sous les étoiles"},
  "Cocktails, mocktails, shisha": {de:"Cocktails, alkoholfreie Drinks, Shisha", ru:"Коктейли, безалкогольные напитки, кальян", fr:"Cocktails, mocktails, chicha"},
  "Cold beers, ice cream, and freshly blended smoothies, served directly to your sunbed.": {de:"Kühle Biere, Eis und frisch gemixte Smoothies, direkt an Ihre Liege serviert.", ru:"Холодное пиво, мороженое и свежие смузи — прямо к вашему шезлонгу.", fr:"Bières fraîches, glaces et smoothies fraîchement préparés, servis directement à votre transat."},
  "Complimentary for all guests": {de:"Kostenlos für alle Gäste", ru:"Бесплатно для всех гостей", fr:"Offert à tous les clients"},
  "Complimentary sunbeds": {de:"Kostenlose Sonnenliegen", ru:"Бесплатные шезлонги", fr:"Transats gratuits"},
  "Conference room, fax service, and business facilities for working travellers.": {de:"Konferenzraum, Faxservice und Geschäftseinrichtungen für berufstätige Reisende.", ru:"Конференц-зал, факс и бизнес-услуги для деловых путешественников.", fr:"Salle de conférence, service de fax et équipements professionnels pour les voyageurs d'affaires."},
  "Connecting": {de:"Verbindend", ru:"Смежные", fr:"Communicantes"},
  "Connecting door": {de:"Verbindungstür", ru:"Смежная дверь", fr:"Porte communicante"},
  "Connecting rooms, kids' clubs, and a heated aqua park designed for laughter.": {de:"Verbindungszimmer, Kinderclubs und ein beheizter Aquapark für viel Gelächter.", ru:"Смежные номера, детские клубы и подогреваемый аквапарк, созданный для смеха.", fr:"Chambres communicantes, clubs pour enfants et un parc aquatique chauffé conçu pour les éclats de rire."},
  "Contact Us — Golden Beach Resort Hurghada": {de:"Kontakt — Golden Beach Resort Hurghada", ru:"Контакты — Golden Beach Resort Хургада", fr:"Contactez-nous — Golden Beach Resort Hurghada"},
  "Contact our reservations team directly for best available rates, group bookings, or special requests.": {de:"Kontaktieren Sie unser Reservierungsteam direkt für die besten verfügbaren Raten, Gruppenbuchungen oder Sonderwünsche.", ru:"Свяжитесь с отделом бронирования напрямую для получения лучших тарифов, групповых броней или особых пожеланий.", fr:"Contactez directement notre équipe de réservation pour obtenir les meilleurs tarifs disponibles, des réservations de groupe ou des demandes spéciales."},
  "Cooking Demo · Crafts": {de:"Kochvorführung · Basteln", ru:"Кулинарный мастер-класс · Рукоделие", fr:"Démonstration de cuisine · Loisirs créatifs"},
  "Craft & cooking workshops": {de:"Bastel- & Kochworkshops", ru:"Мастер-классы по рукоделию и кулинарии", fr:"Ateliers de loisirs créatifs et de cuisine"},
  "Craft Workshop · Trivia Quiz": {de:"Bastelworkshop · Quiz", ru:"Мастер-класс · Викторина", fr:"Atelier créatif · Quiz"},
  "Crafted with": {de:"Gefertigt mit", ru:"Создано с", fr:"Élaboré avec"},
  "Curated selection of 40+ labels": {de:"Kuratierte Auswahl von über 40 Weinen", ru:"Подобранная коллекция из 40+ марок", fr:"Sélection soignée de plus de 40 références"},
  "Czech Republic": {de:"Tschechische Republik", ru:"Чехия", fr:"République tchèque"},
  "Czech Republic · TripAdvisor": {de:"Tschechische Republik · TripAdvisor", ru:"Чехия · TripAdvisor", fr:"République tchèque · TripAdvisor"},
  "DE": {de:"DE", ru:"DE", fr:"DE"},
  "Daily 10:30 & 16:00 at the main pool": {de:"Täglich 10:30 & 16:00 am Hauptpool", ru:"Ежедневно 10:30 и 16:00 у главного бассейна", fr:"Tous les jours à 10h30 et 16h00 à la piscine principale"},
  "Daily creative workshops with painting, sculpture, and Egyptian-themed make-and-take projects.": {de:"Tägliche kreative Workshops mit Malerei, Bildhauerei und ägyptisch inspirierten Bastelprojekten.", ru:"Ежедневные творческие мастер-классы: живопись, лепка и проекты в египетском стиле.", fr:"Ateliers créatifs quotidiens avec peinture, sculpture et projets à réaliser sur le thème de l'Égypte."},
  "Daily tournament 11:00, prizes for winners": {de:"Tägliches Turnier 11:00, Preise für Gewinner", ru:"Ежедневный турнир в 11:00, призы победителям", fr:"Tournoi quotidien à 11h00, prix pour les gagnants"},
  "Daytime Activities": {de:"Tagesaktivitäten", ru:"Дневные активности", fr:"Activités de journée"},
  "Daytime fun —": {de:"Tagesspaß —", ru:"Дневное веселье —", fr:"Divertissement en journée —"},
  "Dining & Bars — Golden Beach Resort Hurghada": {de:"Restaurants & Bars — Golden Beach Resort Hurghada", ru:"Рестораны и бары — Golden Beach Resort Хургада", fr:"Restauration & Bars — Golden Beach Resort Hurghada"},
  "Dinner": {de:"Abendessen", ru:"Ужин", fr:"Dîner"},
  "Dinner only": {de:"Nur Abendessen", ru:"Только ужин", fr:"Dîner uniquement"},
  "Direct Sea View": {de:"Direkter Meerblick", ru:"Прямой вид на море", fr:"Vue directe sur la mer"},
  "Direct from local Hurghada fishermen": {de:"Direkt von lokalen Fischern aus Hurghada", ru:"Напрямую от местных рыбаков Хургады", fr:"Directement des pêcheurs locaux de Hurghada"},
  "Direct sea view": {de:"Direkter Meerblick", ru:"Прямой вид на море", fr:"Vue directe sur la mer"},
  "Diving & snorkelling": {de:"Tauchen & Schnorcheln", ru:"Дайвинг и снорклинг", fr:"Plongée & snorkeling"},
  "Diving Centre": {de:"Tauchzentrum", ru:"Дайвинг-центр", fr:"Centre de plongée"},
  "Doctor & Clinic": {de:"Arzt & Klinik", ru:"Врач и клиника", fr:"Médecin & clinique"},
  "Don": {de:"Don", ru:"Don", fr:"Don"},
  "Don Vito": {de:"Don Vito", ru:"Don Vito", fr:"Don Vito"},
  "Don Vito — Italian": {de:"Don Vito — Italienisch", ru:"Don Vito — Итальянский", fr:"Don Vito — Italien"},
  "During all daylight hours": {de:"Während aller Tagesstunden", ru:"В течение всего светового дня", fr:"Pendant toutes les heures de la journée"},
  "EN": {de:"EN", ru:"EN", fr:"EN"},
  "Early-bird spring rates — save 20%": {de:"Frühbucher-Frühlingsraten — 20% sparen", ru:"Весенние тарифы для ранних бронирований — скидка 20%", fr:"Tarifs de printemps réservation anticipée — économisez 20 %"},
  "Economy Room — Golden Beach Resort Hurghada": {de:"Economy-Zimmer — Golden Beach Resort Hurghada", ru:"Эконом-номер — Golden Beach Resort Хургада", fr:"Chambre Économique — Golden Beach Resort Hurghada"},
  "Egypt": {de:"Ägypten", ru:"Египет", fr:"Égypte"},
  "Egyptian Folklore Night": {de:"Ägyptischer Folkloreabend", ru:"Вечер египетского фольклора", fr:"Soirée folklore égyptien"},
  "Egyptian Night": {de:"Ägyptischer Abend", ru:"Египетский вечер", fr:"Soirée égyptienne"},
  "Egyptian cotton 400-thread linen": {de:"Ägyptische Baumwolle, 400 Fäden", ru:"Египетский хлопок, 400 нитей", fr:"Linge de coton égyptien 400 fils"},
  "Egyptian, Italian, Seafood nights weekly": {de:"Ägyptische, italienische und Meeresfrüchte-Abende wöchentlich", ru:"Египетские, итальянские вечера и вечера морепродуктов еженедельно", fr:"Soirées égyptienne, italienne et fruits de mer chaque semaine"},
  "Eight bars.": {de:"Acht Bars.", ru:"Восемь баров.", fr:"Huit bars."},
  "Eight places to": {de:"Acht Orte zum", ru:"Восемь мест, чтобы", fr:"Huit endroits pour"},
  "Entertainment — Golden Beach Resort Hurghada": {de:"Unterhaltung — Golden Beach Resort Hurghada", ru:"Развлечения — Golden Beach Resort Хургада", fr:"Divertissement — Golden Beach Resort Hurghada"},
  "Evening Disco": {de:"Abenddisco", ru:"Вечерняя дискотека", fr:"Disco en soirée"},
  "Evening Shows": {de:"Abendshows", ru:"Вечерние шоу", fr:"Spectacles en soirée"},
  "Event": {de:"Veranstaltung", ru:"Событие", fr:"Événement"},
  "Every budget,": {de:"Jedes Budget,", ru:"Любой бюджет,", fr:"Chaque budget,"},
  "Every convenience is on site, so you never have to leave unless you want to.": {de:"Jeder Komfort ist vor Ort, sodass Sie das Resort nur verlassen müssen, wenn Sie möchten.", ru:"Все удобства на месте, поэтому покидать курорт нужно только по желанию.", fr:"Tout est sur place, vous n'avez donc jamais à partir, sauf si vous le souhaitez."},
  "Every day,": {de:"Jeden Tag,", ru:"Каждый день,", fr:"Chaque jour,"},
  "Every room faces a garden, a pool, or the sea. All come with daily housekeeping, air-conditioning, flat-screen TV, safe, minibar, and free Wi-Fi.": {de:"Jedes Zimmer blickt auf einen Garten, einen Pool oder das Meer. Alle verfügen über täglichen Zimmerservice, Klimaanlage, Flachbild-TV, Safe, Minibar und kostenloses WLAN.", ru:"Каждый номер выходит в сад, к бассейну или на море. Во всех — ежедневная уборка, кондиционер, ТВ, сейф, мини-бар и бесплатный Wi-Fi.", fr:"Chaque chambre donne sur un jardin, une piscine ou la mer. Toutes disposent d'un ménage quotidien, de la climatisation, d'une TV à écran plat, d'un coffre-fort, d'un minibar et du Wi-Fi gratuit."},
  "Every temperature.": {de:"Jede Temperatur.", ru:"Любая температура.", fr:"Chaque température."},
  "Everything you need,": {de:"Alles, was Sie brauchen,", ru:"Всё, что нужно,", fr:"Tout ce dont vous avez besoin,"},
  "Facilities — Golden Beach Resort Hurghada": {de:"Einrichtungen — Golden Beach Resort Hurghada", ru:"Услуги — Golden Beach Resort Хургада", fr:"Équipements — Golden Beach Resort Hurghada"},
  "Family Room Connected — Golden Beach Resort Hurghada": {de:"Verbundenes Familienzimmer — Golden Beach Resort Hurghada", ru:"Смежный семейный номер — Golden Beach Resort Хургада", fr:"Chambre Familiale Communicante — Golden Beach Resort Hurghada"},
  "Family-friendly, couple-romantic, solo-restorative — all on the same shoreline.": {de:"Familienfreundlich, romantisch für Paare, erholsam für Alleinreisende — alles an derselben Küste.", ru:"Для семей, романтиков и одиночек — всё на одном берегу.", fr:"Idéal pour les familles, romantique pour les couples, ressourçant en solo — le tout sur le même rivage."},
  "Feb 28, 2026": {de:"28. Feb. 2026", ru:"28 февр. 2026", fr:"28 févr. 2026"},
  "Fitness Centre": {de:"Fitnesscenter", ru:"Фитнес-центр", fr:"Centre de remise en forme"},
  "Fitness centre": {de:"Fitnesscenter", ru:"Фитнес-центр", fr:"Centre de remise en forme"},
  "Float the afternoon away": {de:"Lassen Sie den Nachmittag treiben", ru:"Проведите день на воде", fr:"Laissez filer l'après-midi"},
  "Football, swimming races, volleyball, and a twice-weekly mini-Olympics with medals for all.": {de:"Fußball, Schwimmwettbewerbe, Volleyball und zweimal wöchentlich eine Mini-Olympiade mit Medaillen für alle.", ru:"Футбол, заплывы, волейбол и мини-олимпиада дважды в неделю с медалями для всех.", fr:"Football, courses de natation, volley-ball et une mini-olympiade deux fois par semaine avec des médailles pour tous."},
  "For adults and children": {de:"Für Erwachsene und Kinder", ru:"Для взрослых и детей", fr:"Pour adultes et enfants"},
  "For adults and children of all ages": {de:"Für Erwachsene und Kinder jeden Alters", ru:"Для взрослых и детей любого возраста", fr:"Pour adultes et enfants de tous âges"},
  "For guests with difficulty moving, we select rooms near the reception or main dining room, reachable by elevator.": {de:"Für Gäste mit eingeschränkter Mobilität wählen wir Zimmer nahe der Rezeption oder dem Hauptrestaurant, per Aufzug erreichbar.", ru:"Для гостей с ограниченной подвижностью мы подбираем номера рядом с ресепшн или главным рестораном, с доступом на лифте.", fr:"Pour les clients à mobilité réduite, nous sélectionnons des chambres proches de la réception ou du restaurant principal, accessibles par ascenseur."},
  "France": {de:"Frankreich", ru:"Франция", fr:"France"},
  "Fresh daily catch": {de:"Täglich frischer Fang", ru:"Свежий улов каждый день", fr:"Pêche fraîche du jour"},
  "From 8am until sunset, every day": {de:"Von 8 Uhr bis Sonnenuntergang, jeden Tag", ru:"С 8 утра до заката, каждый день", fr:"De 8h jusqu'au coucher du soleil, tous les jours"},
  "From buffet to": {de:"Vom Buffet bis zur", ru:"От буфета до", fr:"Du buffet au"},
  "From cosy retreats to": {de:"Von gemütlichen Refugien bis zu", ru:"От уютных номеров до", fr:"Des refuges douillets aux"},
  "From sunrise yoga on the beach to deep-tissue massage in our tranquil spa, every form of renewal is covered.": {de:"Von Sonnenaufgangs-Yoga am Strand bis zur Tiefengewebsmassage in unserem ruhigen Spa — jede Form der Erholung ist abgedeckt.", ru:"От йоги на рассвете на пляже до глубокого массажа в нашем тихом спа — здесь есть всё для восстановления.", fr:"Du yoga au lever du soleil sur la plage au massage des tissus profonds dans notre spa paisible, toutes les formes de ressourcement sont couvertes."},
  "From sunrise yoga to": {de:"Von Sonnenaufgangs-Yoga bis", ru:"От йоги на рассвете до", fr:"Du yoga au lever du soleil au"},
  "From the first espresso at the lobby café to the last cocktail at the beach bar, we've got every hour of the day covered.": {de:"Vom ersten Espresso im Lobby-Café bis zum letzten Cocktail an der Strandbar — wir haben jede Stunde des Tages abgedeckt.", ru:"От первого эспрессо в лобби-кафе до последнего коктейля в пляжном баре — мы заполним каждый час дня.", fr:"Du premier espresso au café du hall au dernier cocktail au bar de la plage, nous couvrons chaque heure de la journée."},
  "Full salon services": {de:"Komplette Salonservices", ru:"Полный спектр салонных услуг", fr:"Services de salon complets"},
  "Full sea view": {de:"Voller Meerblick", ru:"Полный вид на море", fr:"Vue mer panoramique"},
  "GOLDEN BEACH": {de:"GOLDEN BEACH", ru:"GOLDEN BEACH", fr:"GOLDEN BEACH"},
  "Gallery — Golden Beach Resort Hurghada": {de:"Galerie — Golden Beach Resort Hurghada", ru:"Галерея — Golden Beach Resort Хургада", fr:"Galerie — Golden Beach Resort Hurghada"},
  "Garden": {de:"Garten", ru:"Сад", fr:"Jardin"},
  "Garden / Pool": {de:"Garten / Pool", ru:"Сад / Бассейн", fr:"Jardin / Piscine"},
  "Garden or swimming pool views, with the same trusted comforts as our other categories.": {de:"Garten- oder Poolblick mit demselben bewährten Komfort wie in unseren anderen Kategorien.", ru:"Вид на сад или бассейн с тем же проверенным комфортом, что и в других категориях.", fr:"Vue sur le jardin ou la piscine, avec le même confort de confiance que nos autres catégories."},
  "Garden view": {de:"Gartenblick", ru:"Вид на сад", fr:"Vue sur le jardin"},
  "Garden views and a cosy layout make this the smart pick for budget-conscious travellers.": {de:"Gartenblick und ein gemütliches Layout machen dies zur klugen Wahl für preisbewusste Reisende.", ru:"Вид на сад и уютная планировка делают этот номер разумным выбором для экономных путешественников.", fr:"Une vue sur le jardin et un agencement douillet en font le choix judicieux pour les voyageurs soucieux de leur budget."},
  "Germany": {de:"Deutschland", ru:"Германия", fr:"Allemagne"},
  "Germany · TripAdvisor": {de:"Deutschland · TripAdvisor", ru:"Германия · TripAdvisor", fr:"Allemagne · TripAdvisor"},
  "Glimpses from across the resort — from the first cup of coffee on the terrace to the last lamp in the gardens.": {de:"Eindrücke aus dem gesamten Resort — von der ersten Tasse Kaffee auf der Terrasse bis zur letzten Lampe in den Gärten.", ru:"Зарисовки со всего курорта — от первой чашки кофе на террасе до последнего фонаря в садах.", fr:"Aperçus de tout le complexe — du premier café sur la terrasse à la dernière lampe dans les jardins."},
  "Glimpses of the Red Sea combined with leafy garden surroundings make this a peaceful retreat.": {de:"Blicke auf das Rote Meer in Kombination mit grüner Gartenumgebung machen dies zu einem friedlichen Rückzugsort.", ru:"Виды на Красное море в сочетании с зеленью садов делают этот номер тихим уголком.", fr:"Des aperçus de la mer Rouge alliés à un environnement de jardins verdoyants en font une retraite paisible."},
  "Golden Beach Resort — Hurghada, Red Sea": {de:"Golden Beach Resort — Hurghada, Rotes Meer", ru:"Golden Beach Resort — Хургада, Красное море", fr:"Golden Beach Resort — Hurghada, mer Rouge"},
  "Grand Amphitheatre": {de:"Großes Amphitheater", ru:"Большой амфитеатр", fr:"Grand amphithéâtre"},
  "Guest Rooms": {de:"Gästezimmer", ru:"Гостевые номера", fr:"Chambres"},
  "Guest Services": {de:"Gästeservice", ru:"Услуги для гостей", fr:"Services aux clients"},
  "Guest reviews": {de:"Gästebewertungen", ru:"Отзывы гостей", fr:"Avis clients"},
  "Hair, manicure, pedicure, waxing": {de:"Haare, Maniküre, Pediküre, Waxing", ru:"Волосы, маникюр, педикюр, депиляция", fr:"Coiffure, manucure, pédicure, épilation"},
  "Hairdryer": {de:"Haartrockner", ru:"Фен", fr:"Sèche-cheveux"},
  "Half a kilometre of soft white sand and crystal-clear shallows, just for guests.": {de:"Einen halben Kilometer feinen weißen Sand und kristallklares flaches Wasser, nur für Gäste.", ru:"Полкилометра мягкого белого песка и кристально чистого мелководья — только для гостей.", fr:"Un demi-kilomètre de sable blanc et fin et d'eaux peu profondes cristallines, réservé aux clients."},
  "Have any queries?": {de:"Haben Sie Fragen?", ru:"Есть вопросы?", fr:"Vous avez des questions ?"},
  "Heated in winter, cooled in summer. Lap-lanes, kids' pools, and palm-shaded loungers.": {de:"Im Winter beheizt, im Sommer gekühlt. Schwimmbahnen, Kinderpools und palmenbeschattete Liegen.", ru:"Подогрев зимой, охлаждение летом. Дорожки для плавания, детские бассейны и шезлонги в тени пальм.", fr:"Chauffée en hiver, rafraîchie en été. Couloirs de nage, piscines pour enfants et transats à l'ombre des palmiers."},
  "Heated indoor pool": {de:"Beheiztes Hallenbad", ru:"Подогреваемый крытый бассейн", fr:"Piscine intérieure chauffée"},
  "High-speed Wi-Fi": {de:"Highspeed-WLAN", ru:"Высокоскоростной Wi-Fi", fr:"Wi-Fi haut débit"},
  "Hospitality": {de:"Gastfreundschaft", ru:"Гостеприимство", fr:"Hospitalité"},
  "Hurghada, Red Sea": {de:"Hurghada, Rotes Meer", ru:"Хургада, Красное море", fr:"Hurghada, mer Rouge"},
  "International buffet · Up to 600 seats": {de:"Internationales Buffet · Bis zu 600 Plätze", ru:"Международный буфет · До 600 мест", fr:"Buffet international · Jusqu'à 600 places"},
  "Italian Night returns to the Beach Restaurant": {de:"Italienischer Abend kehrt ins Strandrestaurant zurück", ru:"Итальянский вечер возвращается в пляжный ресторан", fr:"La Soirée italienne revient au Beach Restaurant"},
  "Italian wine list": {de:"Italienische Weinkarte", ru:"Итальянская винная карта", fr:"Carte des vins italiens"},
  "Italian à la carte trattoria": {de:"Italienische à-la-carte-Trattoria", ru:"Итальянская траттория à la carte", fr:"Trattoria italienne à la carte"},
  "Italy": {de:"Italien", ru:"Италия", fr:"Italie"},
  "Jan 20, 2026": {de:"20. Jan. 2026", ru:"20 янв. 2026", fr:"20 janv. 2026"},
  "Juliet balcony on all floors": {de:"Juliet-Balkon auf allen Etagen", ru:"Французский балкон на всех этажах", fr:"Balcon à la française à tous les étages"},
  "Kayaks, pedalos, paddleboards": {de:"Kajaks, Tretboote, Paddleboards", ru:"Каяки, катамараны, сапборды", fr:"Kayaks, pédalos, paddleboards"},
  "Kayaks, pedalos, paddleboards, windsurfing": {de:"Kajaks, Tretboote, Paddleboards, Windsurfen", ru:"Каяки, катамараны, сапборды, виндсёрфинг", fr:"Kayaks, pédalos, paddleboards, planche à voile"},
  "Kettle & supplies": {de:"Wasserkocher & Zubehör", ru:"Чайник и принадлежности", fr:"Bouilloire & nécessaire"},
  "Kids' disco every Tuesday and Saturday, 20:00–21:00 — glitter, glow sticks, and soft drinks.": {de:"Kinderdisco jeden Dienstag und Samstag, 20:00–21:00 — Glitzer, Knicklichter und Softdrinks.", ru:"Детская дискотека по вторникам и субботам, 20:00–21:00 — блёстки, светящиеся палочки и напитки.", fr:"Disco pour enfants chaque mardi et samedi, de 20h00 à 21h00 — paillettes, bâtons lumineux et boissons non alcoolisées."},
  "Kids' pool with 3 slides": {de:"Kinderpool mit 3 Rutschen", ru:"Детский бассейн с 3 горками", fr:"Piscine pour enfants avec 3 toboggans"},
  "Kids' splash zone": {de:"Kinder-Spritzbereich", ru:"Детская зона для брызг", fr:"Espace aquatique pour enfants"},
  "King bed + sofa bed": {de:"Kingsize-Bett + Schlafsofa", ru:"Кровать king-size + диван-кровать", fr:"Lit king size + canapé-lit"},
  "King or twin beds": {de:"Kingsize- oder Einzelbetten", ru:"Кровать king-size или две односпальные", fr:"Lit king size ou lits jumeaux"},
  "King-size bed": {de:"Kingsize-Bett", ru:"Кровать king-size", fr:"Lit king size"},
  "King-size bed + single beds": {de:"Kingsize-Bett + Einzelbetten", ru:"Кровать king-size + односпальные", fr:"Lit king size + lits simples"},
  "King-size bed + sofa beds": {de:"Kingsize-Bett + Schlafsofas", ru:"Кровать king-size + диван-кровати", fr:"Lit king size + canapés-lits"},
  "Lane swimming 06:00–08:00 daily": {de:"Bahnenschwimmen 06:00–08:00 täglich", ru:"Плавание по дорожкам 06:00–08:00 ежедневно", fr:"Nage en couloir de 06h00 à 08h00 tous les jours"},
  "Laundry, taxi service, photo service, and concierge available daily.": {de:"Wäscheservice, Taxiservice, Fotoservice und Concierge täglich verfügbar.", ru:"Прачечная, такси, фотоуслуги и консьерж доступны ежедневно.", fr:"Blanchisserie, service de taxi, service photo et conciergerie disponibles chaque jour."},
  "Lazy river": {de:"Strömungskanal", ru:"Ленивая река", fr:"Rivière paresseuse"},
  "Lazy river + 2 relax pools": {de:"Strömungskanal + 2 Entspannungspools", ru:"Ленивая река + 2 бассейна для отдыха", fr:"Rivière paresseuse + 2 piscines de détente"},
  "Let us know.": {de:"Lassen Sie es uns wissen.", ru:"Дайте нам знать.", fr:"Faites-le-nous savoir."},
  "Lifeguard on duty": {de:"Rettungsschwimmer im Dienst", ru:"Дежурный спасатель", fr:"Maître-nageur de service"},
  "Little guests,": {de:"Kleine Gäste,", ru:"Маленькие гости,", fr:"Petits invités,"},
  "Live Band Night": {de:"Live-Band-Abend", ru:"Вечер живой музыки", fr:"Soirée groupe live"},
  "Live Entertainment": {de:"Live-Unterhaltung", ru:"Живые развлечения", fr:"Divertissements en direct"},
  "Live shows": {de:"Live-Shows", ru:"Живые шоу", fr:"Spectacles en direct"},
  "Lobby Bar": {de:"Lobby-Bar", ru:"Лобби-бар", fr:"Bar du hall"},
  "Lunch": {de:"Mittagessen", ru:"Обед", fr:"Déjeuner"},
  "Lunch & dinner": {de:"Mittag- & Abendessen", ru:"Обед и ужин", fr:"Déjeuner & dîner"},
  "Lush Gardens": {de:"Üppige Gärten", ru:"Пышные сады", fr:"Jardins luxuriants"},
  "Main Buffet": {de:"Hauptbuffet", ru:"Главный буфет", fr:"Buffet principal"},
  "Main Pool": {de:"Hauptpool", ru:"Главный бассейн", fr:"Piscine principale"},
  "Malaysia · TripAdvisor": {de:"Malaysia · TripAdvisor", ru:"Малайзия · TripAdvisor", fr:"Malaisie · TripAdvisor"},
  "Mar 15, 2026": {de:"15. März 2026", ru:"15 мар. 2026", fr:"15 mars 2026"},
  "Marcus & Family": {de:"Marcus & Familie", ru:"Маркус и семья", fr:"Marcus & sa famille"},
  "Massage treatments": {de:"Massagebehandlungen", ru:"Массажные процедуры", fr:"Soins de massage"},
  "Max 3 or 2+2": {de:"Max. 3 oder 2+2", ru:"Макс. 3 или 2+2", fr:"3 personnes max ou 2+2"},
  "Maximum 2 persons": {de:"Maximal 2 Personen", ru:"Максимум 2 человека", fr:"Maximum 2 personnes"},
  "Maximum 3 persons or 2+1": {de:"Maximal 3 Personen oder 2+1", ru:"Максимум 3 человека или 2+1", fr:"Maximum 3 personnes ou 2+1"},
  "Maximum 3 persons or 2+2": {de:"Maximal 3 Personen oder 2+2", ru:"Максимум 3 человека или 2+2", fr:"Maximum 3 personnes ou 2+2"},
  "Maximum 4 persons": {de:"Maximal 4 Personen", ru:"Максимум 4 человека", fr:"Maximum 4 personnes"},
  "Maximum 5 persons": {de:"Maximal 5 Personen", ru:"Максимум 5 человек", fr:"Maximum 5 personnes"},
  "May 02, 2026": {de:"02. Mai 2026", ru:"02 мая 2026", fr:"02 mai 2026"},
  "Mbps Wi-Fi": {de:"Mbit/s WLAN", ru:"Мбит/с Wi-Fi", fr:"Mbps Wi-Fi"},
  "Mini Show": {de:"Mini-Show", ru:"Мини-шоу", fr:"Mini spectacle"},
  "Mini Sports": {de:"Mini-Sport", ru:"Мини-спорт", fr:"Mini sports"},
  "Mini bar — daily filled with water": {de:"Minibar — täglich mit Wasser gefüllt", ru:"Мини-бар — ежедневно пополняется водой", fr:"Mini-bar — réapprovisionné chaque jour en eau"},
  "Mini bar — water, soft drinks & beer": {de:"Minibar — Wasser, Softdrinks & Bier", ru:"Мини-бар — вода, напитки и пиво", fr:"Mini-bar — eau, boissons non alcoolisées & bière"},
  "Modern gym equipment, 06:00–22:00": {de:"Moderne Fitnessgeräte, 06:00–22:00", ru:"Современное оборудование, 06:00–22:00", fr:"Équipements de gym modernes, 06:00–22:00"},
  "Monday & Thursday": {de:"Montag & Donnerstag", ru:"Понедельник и четверг", fr:"Lundi & jeudi"},
  "NW Hurghada": {de:"Nordwest-Hurghada", ru:"Северо-запад Хургады", fr:"Nord-ouest de Hurghada"},
  "NW Hurghada, Red Sea": {de:"Nordwest-Hurghada, Rotes Meer", ru:"Северо-запад Хургады, Красное море", fr:"Nord-ouest de Hurghada, mer Rouge"},
  "Neapolitan-style, 11 varieties": {de:"Neapolitanischer Stil, 11 Sorten", ru:"Неаполитанская, 11 видов", fr:"Style napolitain, 11 variétés"},
  "Netherlands": {de:"Niederlande", ru:"Нидерланды", fr:"Pays-Bas"},
  "News — Golden Beach Resort Hurghada": {de:"News — Golden Beach Resort Hurghada", ru:"Новости — Golden Beach Resort Хургада", fr:"Actualités — Golden Beach Resort Hurghada"},
  "Non-smoking room": {de:"Nichtraucherzimmer", ru:"Номер для некурящих", fr:"Chambre non-fumeur"},
  "Non-smoking rooms": {de:"Nichtraucherzimmer", ru:"Номера для некурящих", fr:"Chambres non-fumeur"},
  "Offer": {de:"Angebot", ru:"Предложение", fr:"Offre"},
  "On-site PADI diving centre with daily trips to the Red Sea's famous reefs.": {de:"PADI-Tauchzentrum vor Ort mit täglichen Ausflügen zu den berühmten Riffen des Roten Meeres.", ru:"Дайвинг-центр PADI на территории с ежедневными выездами к знаменитым рифам Красного моря.", fr:"Centre de plongée PADI sur place avec sorties quotidiennes vers les célèbres récifs de la mer Rouge."},
  "On-site doctor and 24-hour medical assistance for total peace of mind.": {de:"Arzt vor Ort und medizinische Hilfe rund um die Uhr für absolute Sorglosigkeit.", ru:"Врач на территории и круглосуточная медицинская помощь для полного спокойствия.", fr:"Médecin sur place et assistance médicale 24h/24 pour une tranquillité d'esprit totale."},
  "One email a season. Seasonal offers, new menus, and reef updates. Unsubscribe with a single click.": {de:"Eine E-Mail pro Saison. Saisonale Angebote, neue Menüs und Riff-Updates. Mit einem Klick abbestellen.", ru:"Одно письмо в сезон. Сезонные предложения, новые меню и новости о рифах. Отписка в один клик.", fr:"Un e-mail par saison. Offres saisonnières, nouveaux menus et actualités des récifs. Désabonnement en un seul clic."},
  "One of the largest amphitheatres on the Red Sea, with shows every night.": {de:"Eines der größten Amphitheater am Roten Meer, mit Shows jeden Abend.", ru:"Один из крупнейших амфитеатров на Красном море с шоу каждый вечер.", fr:"L'un des plus grands amphithéâtres de la mer Rouge, avec des spectacles chaque soir."},
  "One unforgettable evening.": {de:"Ein unvergesslicher Abend.", ru:"Один незабываемый вечер.", fr:"Une soirée inoubliable."},
  "Open 24 hours, 7 days a week": {de:"24 Stunden geöffnet, 7 Tage die Woche", ru:"Открыто 24 часа, 7 дней в неделю", fr:"Ouvert 24 heures sur 24, 7 jours sur 7"},
  "Open daily 09:00–21:00": {de:"Täglich 09:00–21:00 geöffnet", ru:"Открыто ежедневно 09:00–21:00", fr:"Ouvert tous les jours de 09:00 à 21:00"},
  "Our All-Inclusive concept covers all your food. In addition to our main restaurant, enjoy our themed à la carte restaurants — included in your package, as often as you like.": {de:"Unser All-Inclusive-Konzept deckt Ihre gesamte Verpflegung ab. Genießen Sie neben unserem Hauptrestaurant unsere themenbezogenen à-la-carte-Restaurants — in Ihrem Paket inbegriffen, so oft Sie möchten.", ru:"Наша концепция «всё включено» покрывает всё питание. Помимо главного ресторана, наслаждайтесь тематическими ресторанами à la carte — они включены в пакет, сколько угодно раз.", fr:"Notre concept tout compris couvre l'ensemble de vos repas. En complément de notre restaurant principal, profitez de nos restaurants à thème à la carte — inclus dans votre forfait, aussi souvent que vous le souhaitez."},
  "Our Private Beach": {de:"Unser Privatstrand", ru:"Наш частный пляж", fr:"Notre plage privée"},
  "Our entertainment team runs a full seven-night programme — from live bands and belly dance shows to quiz nights and cinema under the stars.": {de:"Unser Unterhaltungsteam bietet ein komplettes Sieben-Nächte-Programm — von Live-Bands und Bauchtanzshows bis zu Quizabenden und Kino unter den Sternen.", ru:"Наша команда аниматоров проводит программу на семь вечеров — от живых групп и танца живота до викторин и кино под звёздами.", fr:"Notre équipe d'animation propose un programme complet sur sept soirées — des groupes live et spectacles de danse orientale aux soirées quiz et cinéma sous les étoiles."},
  "Our flagship category combines generous space with the best views in the resort, ideal for couples seeking extra comfort or small families.": {de:"Unsere Flaggschiff-Kategorie verbindet großzügigen Raum mit den besten Aussichten im Resort, ideal für Paare, die zusätzlichen Komfort suchen, oder kleine Familien.", ru:"Наша флагманская категория сочетает простор и лучшие виды на курорте — идеально для пар, ищущих дополнительный комфорт, или небольших семей.", fr:"Notre catégorie phare allie des espaces généreux aux plus belles vues du complexe, idéale pour les couples en quête de confort supplémentaire ou les petites familles."},
  "Our fully-supervised Mini Club runs every day for children aged 4–12, so parents can relax while little ones make friends and memories.": {de:"Unser vollständig betreuter Mini-Club ist täglich für Kinder von 4–12 Jahren geöffnet, sodass Eltern entspannen können, während die Kleinen Freunde finden und Erinnerungen schaffen.", ru:"Наш мини-клуб с полным присмотром работает ежедневно для детей 4–12 лет, чтобы родители могли отдыхать, пока малыши заводят друзей.", fr:"Notre Mini Club entièrement encadré fonctionne chaque jour pour les enfants de 4 à 12 ans, afin que les parents puissent se détendre pendant que les petits se font des amis et des souvenirs."},
  "Our open-air amphitheatre — one of the Red Sea's largest — launches its summer programme with nightly shows.": {de:"Unser Open-Air-Amphitheater — eines der größten am Roten Meer — startet sein Sommerprogramm mit allabendlichen Shows.", ru:"Наш амфитеатр под открытым небом — один из крупнейших на Красном море — открывает летнюю программу с ежевечерними шоу.", fr:"Notre amphithéâtre en plein air — l'un des plus grands de la mer Rouge — lance son programme estival avec des spectacles chaque soir."},
  "PADI-certified instructors on site": {de:"PADI-zertifizierte Instruktoren vor Ort", ru:"Инструкторы с сертификатом PADI на месте", fr:"Instructeurs certifiés PADI sur place"},
  "Panoramic window, private balcony": {de:"Panoramafenster, privater Balkon", ru:"Панорамное окно, собственный балкон", fr:"Fenêtre panoramique, balcon privé"},
  "Perfectly suited to couples looking for a romantic escape right on the water.": {de:"Perfekt geeignet für Paare, die eine romantische Auszeit direkt am Wasser suchen.", ru:"Идеально для пар, ищущих романтический отдых прямо у воды.", fr:"Parfaitement adaptée aux couples en quête d'une escapade romantique au bord de l'eau."},
  "Plan your": {de:"Planen Sie Ihren", ru:"Спланируйте свой", fr:"Planifiez votre"},
  "Poland": {de:"Polen", ru:"Польша", fr:"Pologne"},
  "Pool & Lobby Bars": {de:"Pool- & Lobby-Bars", ru:"Бары у бассейна и в лобби", fr:"Bars de la piscine & du hall"},
  "Pool Bar": {de:"Poolbar", ru:"Бар у бассейна", fr:"Bar de la piscine"},
  "Pool Party · DJ Set": {de:"Poolparty · DJ-Set", ru:"Вечеринка у бассейна · DJ-сет", fr:"Pool Party · DJ Set"},
  "Pool Side": {de:"Poolbereich", ru:"У бассейна", fr:"Bord de piscine"},
  "Pools": {de:"Pools", ru:"Бассейны", fr:"Piscines"},
  "Premium": {de:"Premium", ru:"Премиум", fr:"Premium"},
  "Premium Room — Golden Beach Resort Hurghada": {de:"Premium-Zimmer — Golden Beach Resort Hurghada", ru:"Премиум-номер — Golden Beach Resort Хургада", fr:"Chambre Premium — Golden Beach Resort Hurghada"},
  "Premium Suite": {de:"Premium-Suite", ru:"Премиум-люкс", fr:"Suite Premium"},
  "Premium rooms refreshed for 2026": {de:"Premium-Zimmer für 2026 aufgefrischt", ru:"Премиум-номера обновлены к 2026 году", fr:"Chambres Premium rénovées pour 2026"},
  "Quiet location northwest of Hurghada. El Gouna approx. 10 km, Hurghada centre approx. 15 km, International Airport 20 km.": {de:"Ruhige Lage nordwestlich von Hurghada. El Gouna ca. 10 km, Zentrum von Hurghada ca. 15 km, internationaler Flughafen 20 km.", ru:"Тихое расположение к северо-западу от Хургады. Эль-Гуна ок. 10 км, центр Хургады ок. 15 км, международный аэропорт 20 км.", fr:"Emplacement calme au nord-ouest de Hurghada. El Gouna à environ 10 km, centre de Hurghada à environ 15 km, aéroport international à 20 km."},
  "Quiet zone, cocktail service": {de:"Ruhezone, Cocktailservice", ru:"Тихая зона, подача коктейлей", fr:"Zone calme, service de cocktails"},
  "RITUALS amenities throughout": {de:"RITUALS-Pflegeprodukte überall", ru:"Косметика RITUALS повсюду", fr:"Produits RITUALS partout"},
  "RU": {de:"RU", ru:"RU", fr:"RU"},
  "Rain shower + tub": {de:"Regendusche + Badewanne", ru:"Тропический душ + ванна", fr:"Douche à effet pluie + baignoire"},
  "Ready to": {de:"Bereit,", ru:"Готовы", fr:"Prêt à"},
  "Recharge on": {de:"Auftanken am", ru:"Восстановите силы на", fr:"Ressourcez-vous sur"},
  "Recommend us": {de:"Empfehlen uns", ru:"Рекомендуют нас", fr:"Recommandez-nous"},
  "Red Sea coast": {de:"Rotmeerküste", ru:"Побережье Красного моря", fr:"Côte de la mer Rouge"},
  "Red Sea seafood & grills": {de:"Meeresfrüchte & Grillgerichte vom Roten Meer", ru:"Морепродукты и гриль Красного моря", fr:"Fruits de mer & grillades de la mer Rouge"},
  "Red Sea, Egypt": {de:"Rotes Meer, Ägypten", ru:"Красное море, Египет", fr:"Mer Rouge, Égypte"},
  "Reef Snorkelling": {de:"Riff-Schnorcheln", ru:"Снорклинг у рифа", fr:"Snorkeling sur le récif"},
  "Reef restoration: our 2026 commitment": {de:"Riffrestaurierung: unser Engagement für 2026", ru:"Восстановление рифов: наше обязательство на 2026 год", fr:"Restauration des récifs : notre engagement 2026"},
  "Resort · Hurghada": {de:"Resort · Hurghada", ru:"Курорт · Хургада", fr:"Complexe · Hurghada"},
  "Restaurant": {de:"Restaurant", ru:"Ресторан", fr:"Restaurant"},
  "Restaurants & Bars": {de:"Restaurants & Bars", ru:"Рестораны и бары", fr:"Restaurants & bars"},
  "Room": {de:"Zimmer", ru:"Номер", fr:"Chambre"},
  "Room Categories": {de:"Zimmerkategorien", ru:"Категории номеров", fr:"Catégories de chambres"},
  "Room Service": {de:"Zimmerservice", ru:"Обслуживание номеров", fr:"Service en chambre"},
  "Rooms — Golden Beach Resort Hurghada": {de:"Zimmer — Golden Beach Resort Hurghada", ru:"Номера — Golden Beach Resort Хургада", fr:"Chambres — Golden Beach Resort Hurghada"},
  "Russia": {de:"Russland", ru:"Россия", fr:"Russie"},
  "SAT-TV": {de:"SAT-TV", ru:"Спутниковое ТВ", fr:"TV par satellite"},
  "Safe box": {de:"Safe", ru:"Сейф", fr:"Coffre-fort"},
  "Sauna, jacuzzi & Turkish bath": {de:"Sauna, Jacuzzi & türkisches Bad", ru:"Сауна, джакузи и турецкая баня", fr:"Sauna, jacuzzi & bain turc"},
  "Sea Side View Room": {de:"Zimmer mit seitlichem Meerblick", ru:"Номер с боковым видом на море", fr:"Chambre vue latérale sur mer"},
  "Sea Side View Room — Golden Beach Resort Hurghada": {de:"Zimmer mit seitlichem Meerblick — Golden Beach Resort Hurghada", ru:"Номер с боковым видом на море — Golden Beach Resort Хургада", fr:"Chambre vue latérale sur mer — Golden Beach Resort Hurghada"},
  "Sea View Room — Golden Beach Resort Hurghada": {de:"Zimmer mit Meerblick — Golden Beach Resort Hurghada", ru:"Номер с видом на море — Golden Beach Resort Хургада", fr:"Chambre vue mer — Golden Beach Resort Hurghada"},
  "Seafood Night": {de:"Meeresfrüchte-Abend", ru:"Вечер морепродуктов", fr:"Soirée fruits de mer"},
  "Seafood, meats, vegetables": {de:"Meeresfrüchte, Fleisch, Gemüse", ru:"Морепродукты, мясо, овощи", fr:"Fruits de mer, viandes, légumes"},
  "Seasonal events &": {de:"Saisonale Veranstaltungen &", ru:"Сезонные события и", fr:"Événements saisonniers &"},
  "Seasonal events, fresh menus, and quiet little improvements around the gardens.": {de:"Saisonale Veranstaltungen, frische Menüs und kleine Verbesserungen rund um die Gärten.", ru:"Сезонные события, новые меню и небольшие улучшения в садах.", fr:"Événements saisonniers, nouveaux menus et petites améliorations discrètes dans les jardins."},
  "Seasonal offers, new menus, and quiet little improvements around the gardens.": {de:"Saisonale Angebote, neue Menüs und kleine Verbesserungen rund um die Gärten.", ru:"Сезонные предложения, новые меню и небольшие улучшения в садах.", fr:"Offres saisonnières, nouveaux menus et petites améliorations discrètes dans les jardins."},
  "Select your country": {de:"Land auswählen", ru:"Выберите страну", fr:"Sélectionnez votre pays"},
  "Set up daily 08:00 to sunset": {de:"Täglich von 08:00 bis Sonnenuntergang aufgebaut", ru:"Устанавливаются ежедневно с 08:00 до заката", fr:"Installation quotidienne de 08:00 au coucher du soleil"},
  "Seven distinct dining experiences under one resort — from sunrise breakfast to midnight mezze.": {de:"Sieben unterschiedliche kulinarische Erlebnisse in einem Resort — vom Frühstück bei Sonnenaufgang bis zu Mezze um Mitternacht.", ru:"Семь разных гастрономических впечатлений на одном курорте — от завтрака на рассвете до мезе в полночь.", fr:"Sept expériences culinaires distinctes au sein d'un même complexe — du petit-déjeuner au lever du soleil aux mezze de minuit."},
  "Seven ways to sleep beside": {de:"Sieben Arten, am Roten Meer zu schlafen", ru:"Семь способов уснуть у", fr:"Sept façons de dormir au bord de"},
  "Shallow and supervised": {de:"Flach und beaufsichtigt", ru:"Мелко и под присмотром", fr:"Peu profond et surveillé"},
  "Shallow water, kids' clubs, connecting rooms, and an aqua park designed for laughter.": {de:"Flaches Wasser, Kinderclubs, Verbindungszimmer und ein Aquapark für viel Gelächter.", ru:"Мелководье, детские клубы, смежные номера и аквапарк, созданный для смеха.", fr:"Eau peu profonde, clubs enfants, chambres communicantes et un parc aquatique conçu pour les rires."},
  "Shallow, safe,": {de:"Flach, sicher,", ru:"Мелко, безопасно,", fr:"Peu profond, sûr,"},
  "Shallow, supervised, with water jets": {de:"Flach, beaufsichtigt, mit Wasserdüsen", ru:"Мелко, под присмотром, с водными струями", fr:"Peu profond, surveillé, avec jets d'eau"},
  "Shopping": {de:"Einkaufen", ru:"Шопинг", fr:"Boutiques"},
  "Shower": {de:"Dusche", ru:"Душ", fr:"Douche"},
  "Showers & changing cabins": {de:"Duschen & Umkleidekabinen", ru:"Душевые и кабинки для переодевания", fr:"Douches & cabines de change"},
  "Side Sea View": {de:"Seitlicher Meerblick", ru:"Боковой вид на море", fr:"Vue latérale sur mer"},
  "Single beds or double bed": {de:"Einzelbetten oder Doppelbett", ru:"Односпальные или двуспальная кровать", fr:"Lits simples ou lit double"},
  "Single beds or king-size bed": {de:"Einzelbetten oder Kingsize-Bett", ru:"Односпальные или кровать king-size", fr:"Lits simples ou lit king-size"},
  "Six pools.": {de:"Sechs Pools.", ru:"Шесть бассейнов.", fr:"Six piscines."},
  "Sleeps up to 3 guests": {de:"Platz für bis zu 3 Gäste", ru:"Размещение до 3 гостей", fr:"Jusqu'à 3 personnes"},
  "Snorkel & dive trips": {de:"Schnorchel- & Tauchausflüge", ru:"Снорклинг и дайвинг-туры", fr:"Sorties snorkeling & plongée"},
  "Sofa bed — extra bed on request": {de:"Schlafsofa — Zustellbett auf Anfrage", ru:"Диван-кровать — доп. кровать по запросу", fr:"Canapé-lit — lit supplémentaire sur demande"},
  "Something on,": {de:"Immer etwas los,", ru:"Всегда что-то есть,", fr:"Toujours une animation,"},
  "Spa & Massage": {de:"Spa & Massage", ru:"Спа и массаж", fr:"Spa & massage"},
  "Spacious balcony or terrace": {de:"Geräumiger Balkon oder Terrasse", ru:"Просторный балкон или терраса", fr:"Balcon ou terrasse spacieux"},
  "Spacious balcony, side sea view": {de:"Geräumiger Balkon, seitlicher Meerblick", ru:"Просторный балкон, боковой вид на море", fr:"Balcon spacieux, vue latérale sur mer"},
  "Spacious terrace or balcony": {de:"Geräumige Terrasse oder Balkon", ru:"Просторная терраса или балкон", fr:"Terrasse ou balcon spacieux"},
  "Specialty coffee, homemade pastries, and light lunch wraps from 07:00.": {de:"Spezialitätenkaffee, hausgemachtes Gebäck und leichte Lunch-Wraps ab 07:00.", ru:"Спешелти-кофе, домашняя выпечка и лёгкие ланч-роллы с 07:00.", fr:"Café de spécialité, pâtisseries maison et wraps légers pour le déjeuner dès 07:00."},
  "Sports Courts": {de:"Sportplätze", ru:"Спортивные площадки", fr:"Terrains de sport"},
  "Standard Family Room": {de:"Standard-Familienzimmer", ru:"Стандартный семейный номер", fr:"Chambre Familiale Standard"},
  "Standard Family Room — Golden Beach Resort Hurghada": {de:"Standard-Familienzimmer — Golden Beach Resort Hurghada", ru:"Стандартный семейный номер — Golden Beach Resort Хургада", fr:"Chambre Familiale Standard — Golden Beach Resort Hurghada"},
  "Standard Room — Golden Beach Resort Hurghada": {de:"Standard-Zimmer — Golden Beach Resort Hurghada", ru:"Стандартный номер — Golden Beach Resort Хургада", fr:"Chambre Standard — Golden Beach Resort Hurghada"},
  "State-of-the-art Technogym equipment, free weights, spin studio, and personal training. 06:00–22:00.": {de:"Modernste Technogym-Geräte, Freihanteln, Spinning-Studio und Personal Training. 06:00–22:00.", ru:"Современное оборудование Technogym, свободные веса, сайкл-студия и персональные тренировки. 06:00–22:00.", fr:"Équipements Technogym dernier cri, poids libres, studio de spinning et coaching personnel. 06:00–22:00."},
  "Summer Stay 7-for-5 — book by June": {de:"Sommeraufenthalt 7-für-5 — bis Juni buchen", ru:"Летнее проживание 7 по цене 5 — бронируйте до июня", fr:"Séjour d'été 7 pour 5 — réservez avant juin"},
  "Summer amphitheatre season opens June 1": {de:"Sommer-Amphitheatersaison beginnt am 1. Juni", ru:"Летний сезон амфитеатра открывается 1 июня", fr:"La saison de l'amphithéâtre d'été ouvre le 1er juin"},
  "Sun beds, umbrellas & towels": {de:"Sonnenliegen, Schirme & Handtücher", ru:"Шезлонги, зонты и полотенца", fr:"Transats, parasols & serviettes"},
  "Sunrise Yoga · Aqua Aerobics": {de:"Sonnenaufgangs-Yoga · Aqua-Aerobic", ru:"Йога на рассвете · Аквааэробика", fr:"Yoga au lever du soleil · Aquagym"},
  "Sunrise Yoga · Aqua Gym": {de:"Sonnenaufgangs-Yoga · Aqua-Gym", ru:"Йога на рассвете · Аква-гим", fr:"Yoga au lever du soleil · Aquagym"},
  "Sunrise Yoga · Family Games": {de:"Sonnenaufgangs-Yoga · Familienspiele", ru:"Йога на рассвете · Семейные игры", fr:"Yoga au lever du soleil · Jeux en famille"},
  "Sunrise Yoga · Pool Aerobics": {de:"Sonnenaufgangs-Yoga · Pool-Aerobic", ru:"Йога на рассвете · Аэробика в бассейне", fr:"Yoga au lever du soleil · Aérobic en piscine"},
  "Sunrise Yoga · Pool Tournament": {de:"Sonnenaufgangs-Yoga · Poolturnier", ru:"Йога на рассвете · Турнир в бассейне", fr:"Yoga au lever du soleil · Tournoi de piscine"},
  "Sunrise yoga": {de:"Sonnenaufgangs-Yoga", ru:"Йога на рассвете", fr:"Yoga au lever du soleil"},
  "Sunset Hour": {de:"Sonnenuntergangsstunde", ru:"Час заката", fr:"L'heure du coucher de soleil"},
  "Sunset views, cocktail service": {de:"Sonnenuntergangsblick, Cocktailservice", ru:"Виды заката, подача коктейлей", fr:"Vues sur le coucher de soleil, service de cocktails"},
  "Supermarket, gold shop, and souvenir shop right inside the resort.": {de:"Supermarkt, Goldgeschäft und Souvenirladen direkt im Resort.", ru:"Супермаркет, ювелирный и сувенирный магазины прямо на курорте.", fr:"Supermarché, bijouterie et boutique de souvenirs directement au sein du complexe."},
  "Supervised mini-camp for ages 4–12, with art, games, and sports. Every day 09:00–17:00.": {de:"Betreutes Mini-Camp für 4–12-Jährige mit Kunst, Spielen und Sport. Täglich 09:00–17:00.", ru:"Мини-лагерь с присмотром для детей 4–12 лет: творчество, игры и спорт. Ежедневно 09:00–17:00.", fr:"Mini-club encadré pour les 4–12 ans, avec activités artistiques, jeux et sports. Tous les jours de 09:00 à 17:00."},
  "Swedish, deep tissue, hot stone & more": {de:"Schwedisch, Tiefengewebe, Hot Stone & mehr", ru:"Шведский, глубокий, горячими камнями и др.", fr:"Suédois, tissus profonds, pierres chaudes et bien plus"},
  "Swim-up bar with frozen cocktails, fresh juices, and light bites. Open 10:00–sunset.": {de:"Swim-up-Bar mit Frozen Cocktails, frischen Säften und kleinen Snacks. Geöffnet 10:00–Sonnenuntergang.", ru:"Бар у бассейна с замороженными коктейлями, свежими соками и закусками. Открыто 10:00–закат.", fr:"Bar accessible depuis la piscine proposant cocktails glacés, jus frais et en-cas légers. Ouvert de 10:00 au coucher du soleil."},
  "Tanja": {de:"Tanja", ru:"Таня", fr:"Tanja"},
  "Telephone": {de:"Telefon", ru:"Телефон", fr:"Téléphone"},
  "The": {de:"Das", ru:"Сеть", fr:"Le"},
  "The Bouquet": {de:"The Bouquet", ru:"The Bouquet", fr:"Le Bouquet"},
  "The Golden Beach Family": {de:"Die Golden-Beach-Familie", ru:"Семья Golden Beach", fr:"La famille Golden Beach"},
  "The Golden Beach is an innovative, contemporary hotel brand": {de:"Das Golden Beach ist eine innovative, zeitgemäße Hotelmarke", ru:"Golden Beach — это инновационный, современный гостиничный бренд", fr:"Le Golden Beach est une marque hôtelière innovante et contemporaine"},
  "The connecting door lets families stay together while giving everyone their own space.": {de:"Die Verbindungstür lässt Familien zusammenbleiben und gibt dennoch jedem seinen eigenen Raum.", ru:"Смежная дверь позволяет семьям быть вместе, давая каждому собственное пространство.", fr:"La porte communicante permet aux familles de rester ensemble tout en offrant à chacun son propre espace."},
  "Themed evenings": {de:"Themenabende", ru:"Тематические вечера", fr:"Soirées à thème"},
  "There are 192 Standard Rooms in the resort, all spacious and comfortable for up to three persons — suitable for a family with one child. These rooms have garden or swimming pool views.": {de:"Es gibt 192 Standardzimmer im Resort, alle geräumig und komfortabel für bis zu drei Personen — geeignet für eine Familie mit einem Kind. Diese Zimmer bieten Garten- oder Poolblick.", ru:"На курорте 192 стандартных номера, все просторные и удобные для трёх человек — подходят для семьи с одним ребёнком. Из этих номеров вид на сад или бассейн.", fr:"Le complexe compte 192 chambres Standard, toutes spacieuses et confortables, pouvant accueillir jusqu'à trois personnes — idéales pour une famille avec un enfant. Ces chambres offrent une vue sur le jardin ou sur la piscine."},
  "Three decades on the": {de:"Drei Jahrzehnte am", ru:"Три десятилетия на", fr:"Trois décennies sur la"},
  "To El Gouna": {de:"Nach El Gouna", ru:"До Эль-Гуны", fr:"Vers El Gouna"},
  "To Hurghada Centre": {de:"Zum Zentrum von Hurghada", ru:"До центра Хургады", fr:"Vers le centre de Hurghada"},
  "To Int'l Airport": {de:"Zum internationalen Flughafen", ru:"До аэропорта", fr:"Vers l'aéroport international"},
  "To the offshore Red Sea reefs": {de:"Zu den vorgelagerten Riffen des Roten Meeres", ru:"К прибрежным рифам Красного моря", fr:"Vers les récifs au large de la mer Rouge"},
  "Traveller 19": {de:"Traveller 19", ru:"Traveller 19", fr:"Voyageur 19"},
  "Tues, Thurs, Sat · 15:00": {de:"Di, Do, Sa · 15:00", ru:"Вт, Чт, Сб · 15:00", fr:"Mar, jeu, sam · 15:00"},
  "Tuesday & Sunday": {de:"Dienstag & Sonntag", ru:"Вторник и воскресенье", fr:"Mardi & dimanche"},
  "Two connected units forming a spacious family suite — a great choice for up to five persons, with a separate room for the children and two bathrooms.": {de:"Zwei verbundene Einheiten bilden eine geräumige Familiensuite — eine gute Wahl für bis zu fünf Personen, mit einem separaten Zimmer für die Kinder und zwei Bädern.", ru:"Два смежных блока образуют просторный семейный люкс — отличный выбор для пяти человек, с отдельной детской комнатой и двумя ванными.", fr:"Deux unités communicantes formant une spacieuse suite familiale — un excellent choix pour jusqu'à cinq personnes, avec une chambre séparée pour les enfants et deux salles de bains."},
  "Two tennis courts, beach volleyball, table tennis, and a half-court basketball area. Rackets available.": {de:"Zwei Tennisplätze, Beachvolleyball, Tischtennis und ein Halbfeld-Basketballbereich. Schläger verfügbar.", ru:"Два теннисных корта, пляжный волейбол, настольный теннис и баскетбольная площадка. Ракетки в наличии.", fr:"Deux courts de tennis, beach-volley, tennis de table et un espace de basket demi-terrain. Raquettes disponibles."},
  "Ukraine": {de:"Ukraine", ru:"Украина", fr:"Ukraine"},
  "United Kingdom": {de:"Vereinigtes Königreich", ru:"Великобритания", fr:"Royaume-Uni"},
  "Up to 2": {de:"Bis zu 2", ru:"До 2", fr:"Jusqu'à 2"},
  "Up to 3": {de:"Bis zu 3", ru:"До 3", fr:"Jusqu'à 3"},
  "Up to 5": {de:"Bis zu 5", ru:"До 5", fr:"Jusqu'à 5"},
  "Up to 6": {de:"Bis zu 6", ru:"До 6", fr:"Jusqu'à 6"},
  "Vito": {de:"Vito", ru:"Vito", fr:"Vito"},
  "Wake up to the Red Sea every morning. These mid-floor rooms feature a full-width picture window and a juliet balcony — ideal for two, with a sofa bed for a third guest.": {de:"Wachen Sie jeden Morgen mit Blick auf das Rote Meer auf. Diese Zimmer in mittleren Etagen verfügen über ein bodentiefes Panoramafenster und einen Juliet-Balkon — ideal für zwei, mit Schlafsofa für einen dritten Gast.", ru:"Просыпайтесь каждое утро с видом на Красное море. Эти номера на средних этажах оснащены панорамным окном во всю стену и французским балконом — идеально для двоих, с диван-кроватью для третьего гостя.", fr:"Réveillez-vous face à la mer Rouge chaque matin. Ces chambres situées aux étages intermédiaires disposent d'une baie vitrée sur toute la largeur et d'un balcon à la française — idéales pour deux personnes, avec un canapé-lit pour un troisième hôte."},
  "Walk-in rain shower": {de:"Ebenerdige Regendusche", ru:"Тропический душ", fr:"Douche à l'italienne à effet pluie"},
  "Watersports": {de:"Wassersport", ru:"Водные виды спорта", fr:"Sports nautiques"},
  "Watersports centre": {de:"Wassersportzentrum", ru:"Центр водных видов спорта", fr:"Centre de sports nautiques"},
  "We will clear it for you at the best. Our reservations and guest relations team replies within 24 hours.": {de:"Wir klären das bestmöglich für Sie. Unser Reservierungs- und Gästebetreuungsteam antwortet innerhalb von 24 Stunden.", ru:"Мы решим всё наилучшим образом. Наша команда бронирования и работы с гостями отвечает в течение 24 часов.", fr:"Nous nous en occuperons au mieux pour vous. Notre équipe des réservations et des relations clients répond sous 24 heures."},
  "We've partnered with HEPCA to plant 1,200 coral fragments on the house reef this year. Read about how guests can join.": {de:"Wir haben uns mit HEPCA zusammengetan, um dieses Jahr 1.200 Korallenfragmente am Hausriff zu pflanzen. Lesen Sie, wie Gäste mitmachen können.", ru:"Совместно с HEPCA мы посадим 1200 фрагментов кораллов на домашнем рифе в этом году. Узнайте, как гости могут присоединиться.", fr:"Nous nous sommes associés à HEPCA pour planter 1 200 fragments de corail sur le récif de la maison cette année. Découvrez comment les clients peuvent y participer."},
  "Wednesday & Saturday": {de:"Mittwoch & Samstag", ru:"Среда и суббота", fr:"Mercredi & samedi"},
  "With adjacent quiet pool": {de:"Mit angrenzendem ruhigem Pool", ru:"С прилегающим тихим бассейном", fr:"Avec piscine calme attenante"},
  "Wood-fired pizza": {de:"Pizza aus dem Holzofen", ru:"Пицца на дровах", fr:"Pizza au feu de bois"},
  "Wood-fired pizza, hand-rolled pasta, and a four-course tasting menu — every Wednesday starting May 6th.": {de:"Pizza aus dem Holzofen, handgerollte Pasta und ein viergängiges Degustationsmenü — jeden Mittwoch ab dem 6. Mai.", ru:"Пицца на дровах, паста ручной работы и дегустационное меню из четырёх блюд — каждую среду с 6 мая.", fr:"Pizza au feu de bois, pâtes roulées à la main et menu dégustation en quatre services — chaque mercredi à partir du 6 mai."},
  "Year-round swimming, 28°C": {de:"Ganzjähriges Schwimmen, 28°C", ru:"Плавание круглый год, 28°C", fr:"Baignade toute l'année, 28°C"},
  "Years of": {de:"Jahre voller", ru:"Годы", fr:"Années de"},
  "Zero boring afternoons.": {de:"Keine langweiligen Nachmittage.", ru:"Никаких скучных дней.", fr:"Zéro après-midi ennuyeux."},
  "a different adventure": {de:"ein anderes Abenteuer", ru:"новое приключение", fr:"une aventure différente"},
  "a night": {de:"pro Nacht", ru:"за ночь", fr:"la nuit"},
  "a night.": {de:"pro Nacht.", ru:"за ночь.", fr:"la nuit."},
  "big adventures": {de:"große Abenteuer", ru:"большие приключения", fr:"de grandes aventures"},
  "book your stay?": {de:"Ihren Aufenthalt zu buchen?", ru:"забронировать отдых?", fr:"réserver votre séjour ?"},
  "every family size": {de:"jede Familiengröße", ru:"любой размер семьи", fr:"toutes les tailles de famille"},
  "every night": {de:"jede Nacht", ru:"каждый вечер", fr:"chaque nuit"},
  "extraordinary": {de:"außergewöhnlich", ru:"необыкновенный", fr:"extraordinaire"},
  "facilities": {de:"Einrichtungen", ru:"услуги", fr:"équipements"},
  "family suites": {de:"Familiensuiten", ru:"семейные люксы", fr:"suites familiales"},
  "family-perfect": {de:"familienperfekt", ru:"идеально для семьи", fr:"parfait pour les familles"},
  "fresh updates": {de:"frische Neuigkeiten", ru:"свежие новости", fr:"nouveautés"},
  "info@goldenbeachresort.net": {de:"info@goldenbeachresort.net", ru:"info@goldenbeachresort.net", fr:"info@goldenbeachresort.net"},
  "km": {de:"km", ru:"км", fr:"km"},
  "midnight shows": {de:"Mitternachtsshows", ru:"полуночные шоу", fr:"spectacles de minuit"},
  "never stops": {de:"hört nie auf", ru:"никогда не прекращается", fr:"ne s'arrête jamais"},
  "of the week": {de:"der Woche", ru:"недели", fr:"de la semaine"},
  "offering an ultimate vacation concept on Hurghada's Red Sea coast — located in a quiet spot northwest of the city, directly on a wide and beautiful beach.": {de:"das ein einzigartiges Urlaubskonzept an Hurghadas Rotmeerküste bietet — an einem ruhigen Ort nordwestlich der Stadt, direkt an einem breiten und schönen Strand.", ru:"предлагающий совершенную концепцию отдыха на побережье Красного моря в Хургаде — в тихом месте к северо-западу от города, прямо на широком и красивом пляже.", fr:"offrant un concept de vacances ultime sur la côte de la mer Rouge à Hurghada — situé dans un lieu paisible au nord-ouest de la ville, directement sur une plage large et magnifique."},
  "on the Red Sea coast.": {de:"an der Rotmeerküste.", ru:"на побережье Красного моря.", fr:"sur la côte de la mer Rouge."},
  "perfect week": {de:"perfekte Woche", ru:"идеальная неделя", fr:"semaine parfaite"},
  "raise a glass": {de:"anzustoßen", ru:"поднять бокал", fr:"levez votre verre"},
  "relaxation": {de:"Entspannung", ru:"расслабление", fr:"détente"},
  "reservation@goldenbeachresort.net": {de:"reservation@goldenbeachresort.net", ru:"reservation@goldenbeachresort.net", fr:"reservation@goldenbeachresort.net"},
  "seven nights": {de:"sieben Nächte", ru:"семь вечеров", fr:"sept nuits"},
  "six pools": {de:"sechs Pools", ru:"шесть бассейнов", fr:"six piscines"},
  "steps away": {de:"nur wenige Schritte entfernt", ru:"в нескольких шагах", fr:"à quelques pas"},
  "the Red Sea": {de:"dem Roten Meer", ru:"Красным морем", fr:"la mer Rouge"},
  "vision above all": {de:"Vision über allem", ru:"видение превыше всего", fr:"une vision avant tout"},
  "vision, three decades in the making.": {de:"Vision, drei Jahrzehnte in der Entstehung.", ru:"видение, создававшееся три десятилетия.", fr:"une vision, trois décennies de réalisation."},
  "what matters": {de:"was zählt", ru:"что важно", fr:"ce qui compte"},
  "your own terms": {de:"Ihren eigenen Bedingungen", ru:"ваших собственных условиях", fr:"selon vos propres conditions"},
  "à la carte": {de:"à la carte", ru:"à la carte", fr:"à la carte"},
  "🌙 Egyptian Folklore Night": {de:"🌙 Ägyptischer Folkloreabend", ru:"🌙 Вечер египетского фольклора", fr:"🌙 Soirée folklore égyptien"},
  "🎬 Cinema Under the Stars": {de:"🎬 Kino unter den Sternen", ru:"🎬 Кино под звёздами", fr:"🎬 Cinéma sous les étoiles"},
  "🎭 Cabaret & Variety Show": {de:"🎭 Kabarett & Varieté-Show", ru:"🎭 Кабаре и эстрадное шоу", fr:"🎭 Cabaret & spectacle de variétés"},
  "🎶 Live Band Night": {de:"🎶 Live-Band-Abend", ru:"🎶 Вечер живой музыки", fr:"🎶 Soirée groupe live"},

  /* ── FINAL paragraphs ── */
  "Tucked into the northwest curve of Hurghada, we sit ten kilometres from El Gouna, fifteen from the city centre, and twenty from Hurghada International Airport. Close enough to explore, far enough to feel away.": {de:"Eingebettet in die nordwestliche Bucht von Hurghada liegen wir zehn Kilometer von El Gouna, fünfzehn vom Stadtzentrum und zwanzig vom internationalen Flughafen Hurghada entfernt. Nah genug zum Erkunden, weit genug, um abzuschalten.", ru:"Расположенные в северо-западной части Хургады, мы находимся в десяти километрах от Эль-Гуны, пятнадцати от центра города и двадцати от международного аэропорта Хургады. Достаточно близко, чтобы исследовать, и достаточно далеко, чтобы отдохнуть.", fr:"Nichés dans la courbe nord-ouest de Hurghada, nous nous trouvons à dix kilomètres d'El Gouna, quinze du centre-ville et vingt de l'aéroport international de Hurghada. Assez proche pour explorer, assez loin pour se sentir ailleurs."},
  "Our shoreline curves gently into the Red Sea — calm, shallow, and warm enough to swim from March through November. Sunbeds, parasols, and beach service are complimentary, and our diving centre is steps away when the reef calls.": {de:"Unsere Küste schwingt sanft ins Rote Meer — ruhig, flach und warm genug zum Schwimmen von März bis November. Sonnenliegen, Sonnenschirme und Strandservice sind kostenlos, und unser Tauchzentrum ist nur wenige Schritte entfernt, wenn das Riff ruft.", ru:"Наш берег плавно уходит в Красное море — спокойное, мелкое и тёплое для купания с марта по ноябрь. Шезлонги, зонты и пляжный сервис бесплатны, а дайвинг-центр в нескольких шагах, когда зовёт риф.", fr:"Notre littoral s'incurve doucement vers la mer Rouge — calme, peu profond et suffisamment chaud pour se baigner de mars à novembre. Transats, parasols et service de plage sont offerts, et notre centre de plongée est à quelques pas lorsque le récif vous appelle."},
  "From our flagship Bouquet international buffet to charcoal-grilled Red Sea fish at the Beach Restaurant, every meal is unhurried. Bars stay open until late, and our themed evenings — Egyptian, Italian, Seafood — are quiet showstoppers.": {de:"Vom Flaggschiff-Buffet Bouquet bis zum vom Holzkohlegrill stammenden Rotmeerfisch im Strandrestaurant ist jede Mahlzeit entspannt. Die Bars haben bis spät geöffnet, und unsere Themenabende — Ägyptisch, Italienisch, Meeresfrüchte — sind stille Höhepunkte.", ru:"От фирменного международного буфета Bouquet до рыбы Красного моря на углях в пляжном ресторане — каждый приём пищи неспешен. Бары работают допоздна, а тематические вечера — египетский, итальянский, морепродукты — тихие гвозди программы.", fr:"De notre buffet international phare le Bouquet aux poissons de la mer Rouge grillés au charbon de bois au Restaurant de la Plage, chaque repas se savoure sans hâte. Les bars restent ouverts jusque tard, et nos soirées à thème — égyptienne, italienne, fruits de mer — sont de discrètes attractions vedettes."},
  "Three thousand reviews. Ninety percent recommend us.": {de:"Dreitausend Bewertungen. Neunzig Prozent empfehlen uns.", ru:"Три тысячи отзывов. Девяносто процентов рекомендуют нас.", fr:"Trois mille avis. Quatre-vingt-dix pour cent nous recommandent."},
  "Our flagship room category sits high in the main building with a full-width panoramic window overlooking the Red Sea. King or twin configuration, generous wardrobe space, and a rain shower with separate soaking tub.": {de:"Unsere Flaggschiff-Zimmerkategorie liegt hoch im Hauptgebäude mit einem bodentiefen Panoramafenster mit Blick auf das Rote Meer. King- oder Einzelbett-Konfiguration, großzügiger Schrankraum und eine Regendusche mit separater Badewanne.", ru:"Наша флагманская категория номеров расположена высоко в главном здании с панорамным окном во всю стену с видом на Красное море. Кровать king-size или две односпальные, вместительный гардероб и тропический душ с отдельной ванной.", fr:"Notre catégorie de chambre phare est située en hauteur dans le bâtiment principal, avec une baie panoramique sur toute la largeur donnant sur la mer Rouge. Configuration lit king ou lits jumeaux, vaste espace de rangement et douche à effet pluie avec baignoire îlot séparée."},
  "Our flagship restaurant seats 600 guests in a soaring glass-and-timber hall facing the garden. Breakfast, lunch, and dinner buffets span Egyptian street food, live pasta stations, carving stations, and a dedicated kids' corner.": {de:"Unser Flaggschiff-Restaurant bietet 600 Gästen Platz in einem hohen Glas-Holz-Saal mit Blick auf den Garten. Frühstücks-, Mittags- und Abendbuffets reichen von ägyptischem Streetfood über Live-Pasta-Stationen und Carving-Stationen bis zu einer eigenen Kinderecke.", ru:"Наш флагманский ресторан вмещает 600 гостей в просторном зале из стекла и дерева с видом на сад. Буфеты на завтрак, обед и ужин включают египетский стритфуд, станции с пастой, мясные станции и детский уголок.", fr:"Notre restaurant phare accueille 600 convives dans une vaste salle de verre et de bois donnant sur le jardin. Les buffets du petit-déjeuner, du déjeuner et du dîner déclinent la street food égyptienne, des stations de pâtes en direct, des stations de découpe et un coin dédié aux enfants."},
  "ITALIAN TRATTORIA": {de:"ITALIENISCHE TRATTORIA", ru:"ИТАЛЬЯНСКАЯ ТРАТТОРИЯ", fr:"TRATTORIA ITALIENNE"},
  "Rustic-chic trattoria serving hand-rolled pasta, wood-fired pizza, and classic Italian mains. Every plate is built from imported Italian staples — buffalo mozzarella, 24-month Parmigiano, Arborio rice — and finished with Red Sea flair.": {de:"Rustikal-schicke Trattoria mit handgerollter Pasta, Pizza aus dem Holzofen und klassischen italienischen Hauptgerichten. Jeder Teller basiert auf importierten italienischen Zutaten — Büffelmozzarella, 24 Monate gereifter Parmigiano, Arborio-Reis — und wird mit Rotmeer-Flair vollendet.", ru:"Уютная траттория с пастой ручной работы, пиццей на дровах и классическими итальянскими блюдами. Каждое блюдо готовится из импортных итальянских продуктов — буйволиная моцарелла, 24-месячный пармезан, рис арборио — с ноткой Красного моря.", fr:"Trattoria rustique-chic servant des pâtes roulées à la main, des pizzas au feu de bois et des plats italiens classiques. Chaque assiette est composée d'ingrédients italiens importés — mozzarella de bufflonne, Parmigiano affiné 24 mois, riz Arborio — et rehaussée d'une touche mer Rouge."},
  "Feet in the sand, plate full of grilled Red Sea catch. This open-air grill sits directly on our private beach — tables lit by lanterns after dark, the sound of gentle waves the only soundtrack you need.": {de:"Füße im Sand, Teller voll gegrilltem Rotmeer-Fang. Dieser Open-Air-Grill liegt direkt an unserem Privatstrand — Tische bei Einbruch der Dunkelheit von Laternen beleuchtet, das Rauschen sanfter Wellen der einzige Soundtrack, den Sie brauchen.", ru:"Ноги в песке, тарелка свежего улова Красного моря на гриле. Этот гриль под открытым небом расположен прямо на нашем частном пляже — столы освещены фонарями после заката, а шум тихих волн — единственный нужный саундтрек.", fr:"Les pieds dans le sable, l'assiette pleine de poissons grillés de la mer Rouge. Ce grill en plein air se trouve directement sur notre plage privée — des tables éclairées aux lanternes à la tombée de la nuit, le doux clapotis des vagues pour seule bande-son."},
  "Our private beach curves gently into the Red Sea — shallow, calm, and warm enough to swim from March through November. Complimentary sunbeds and parasols are set up daily from 08:00, with waiter service throughout.": {de:"Unser Privatstrand schwingt sanft ins Rote Meer — flach, ruhig und warm genug zum Schwimmen von März bis November. Kostenlose Sonnenliegen und Sonnenschirme werden täglich ab 08:00 aufgebaut, mit durchgehendem Kellnerservice.", ru:"Наш частный пляж плавно уходит в Красное море — мелкое, спокойное и тёплое для купания с марта по ноябрь. Бесплатные шезлонги и зонты устанавливаются ежедневно с 08:00, с обслуживанием официантами.", fr:"Notre plage privée s'incurve doucement vers la mer Rouge — peu profonde, calme et suffisamment chaude pour se baigner de mars à novembre. Transats et parasols gratuits sont installés chaque jour dès 08:00, avec service à table tout au long de la journée."},
  "Heated in winter and cooled in summer, our six pools include a 50-metre lap pool, a family pool with beach-entry, a heated indoor pool, a rooftop adults-only pool, a toddlers' splash zone, and a swim-up bar pool.": {de:"Im Winter beheizt und im Sommer gekühlt, umfassen unsere sechs Pools ein 50-Meter-Sportbecken, einen Familienpool mit Strandeinstieg, ein beheiztes Hallenbad, einen Dachpool nur für Erwachsene, einen Kleinkind-Spritzbereich und einen Swim-up-Bar-Pool.", ru:"Подогреваемые зимой и охлаждаемые летом, наши шесть бассейнов включают 50-метровый бассейн, семейный бассейн с пляжным входом, крытый подогреваемый бассейн, бассейн на крыше для взрослых, зону для малышей и бассейн с баром.", fr:"Chauffées en hiver et rafraîchies en été, nos six piscines comprennent une piscine de nage de 50 mètres, une piscine familiale à entrée progressive, une piscine intérieure chauffée, une piscine sur le toit réservée aux adultes, une pataugeoire pour tout-petits et une piscine avec bar accessible depuis l'eau."},
  "Five dedicated towers house twelve slides ranging from gentle family flumes to high-speed freefall drops. The aqua park is free for all guests and runs daily from 10:00 to 18:00 throughout the summer season.": {de:"Fünf eigene Türme beherbergen zwölf Rutschen, von sanften Familienrutschen bis zu schnellen Freifall-Abfahrten. Der Aquapark ist für alle Gäste kostenlos und täglich von 10:00 bis 18:00 während der gesamten Sommersaison geöffnet.", ru:"Пять башен вмещают двенадцать горок — от спокойных семейных до скоростных горок свободного падения. Аквапарк бесплатен для всех гостей и работает ежедневно с 10:00 до 18:00 весь летний сезон.", fr:"Cinq tours dédiées abritent douze toboggans allant de douces glissades familiales aux descentes en chute libre à grande vitesse. Le parc aquatique est gratuit pour tous les clients et fonctionne tous les jours de 10:00 à 18:00 pendant toute la saison estivale."},
  "Our aqua park features 15 slides for adults and children across five towers. Six swimming pools cover every mood: an adults-only 18+ pool, a kids' pool with 3 slides, an active pool, a flooded lazy river, and two dedicated relax pools.": {de:"Unser Aquapark bietet 15 Rutschen für Erwachsene und Kinder auf fünf Türmen. Sechs Schwimmbäder decken jede Stimmung ab: ein Pool nur für Erwachsene 18+, ein Kinderpool mit 3 Rutschen, ein Aktivpool, ein Strömungskanal und zwei eigene Entspannungspools.", ru:"Наш аквапарк предлагает 15 горок для взрослых и детей на пяти башнях. Шесть бассейнов на любое настроение: бассейн для взрослых 18+, детский с 3 горками, активный бассейн, ленивая река и два бассейна для отдыха.", fr:"Notre parc aquatique propose 15 toboggans pour adultes et enfants répartis sur cinq tours. Six piscines couvrent toutes les envies : une piscine réservée aux 18 ans et plus, une piscine pour enfants avec 3 toboggans, une piscine active, une rivière lente et deux piscines dédiées à la détente."},
  "Our wide, shallow beach is ideal for families with small children. Everything you need is provided: showers, changing cabins, sun beds, umbrellas, beach towels, a dedicated beach quiet zone, and a quiet pool nearby.": {de:"Unser breiter, flacher Strand ist ideal für Familien mit kleinen Kindern. Alles, was Sie brauchen, ist vorhanden: Duschen, Umkleidekabinen, Sonnenliegen, Sonnenschirme, Strandtücher, eine eigene Ruhezone am Strand und ein ruhiger Pool in der Nähe.", ru:"Наш широкий мелкий пляж идеален для семей с маленькими детьми. Есть всё необходимое: душевые, кабинки для переодевания, шезлонги, зонты, пляжные полотенца, тихая зона на пляже и спокойный бассейн рядом.", fr:"Notre plage large et peu profonde est idéale pour les familles avec de jeunes enfants. Tout ce dont vous avez besoin est prévu : douches, cabines de change, transats, parasols, serviettes de plage, une zone calme dédiée sur la plage et une piscine tranquille à proximité."},
  "Our spa and fitness centre is a true oasis of relaxation and wellness — massage treatments of every kind, sauna, jacuzzi, Turkish steam bath, plus a full salon offering hairdressing, manicure, pedicure, and waxing.": {de:"Unser Spa- und Fitnesscenter ist eine wahre Oase der Entspannung und des Wohlbefindens — Massagen aller Art, Sauna, Jacuzzi, türkisches Dampfbad sowie ein voller Salon mit Friseur, Maniküre, Pediküre und Waxing.", ru:"Наш спа- и фитнес-центр — настоящий оазис расслабления и здоровья: всевозможные массажи, сауна, джакузи, турецкая баня, а также полноценный салон с парикмахерскими услугами, маникюром, педикюром и депиляцией.", fr:"Notre centre de spa et de remise en forme est un véritable havre de détente et de bien-être — soins de massage en tout genre, sauna, jacuzzi, hammam turc, ainsi qu'un salon complet proposant coiffure, manucure, pédicure et épilation."},
  "Every night at 21:30": {de:"Jeden Abend um 21:30", ru:"Каждый вечер в 21:30", fr:"Chaque soir à 21:30"},
  "Our open-air theatre seats 500 guests under the stars. Every evening at 21:30 a full production show takes the stage — from Egyptian folkloric dance and belly dance extravaganzas to acrobatics, tribute bands, and guest comedy nights.": {de:"Unser Freilichttheater bietet 500 Gästen Platz unter den Sternen. Jeden Abend um 21:30 betritt eine große Produktionsshow die Bühne — von ägyptischem Folkloretanz und Bauchtanz-Spektakeln bis zu Akrobatik, Tribute-Bands und Gast-Comedy-Abenden.", ru:"Наш театр под открытым небом вмещает 500 гостей под звёздами. Каждый вечер в 21:30 на сцену выходит полноценное шоу — от египетских народных танцев и танца живота до акробатики, трибьют-групп и комедийных вечеров.", fr:"Notre théâtre en plein air accueille 500 spectateurs sous les étoiles. Chaque soir à 21:30, un spectacle en production complète monte sur scène — de la danse folklorique égyptienne et des extravagances de danse orientale aux acrobaties, groupes hommage et soirées comiques avec invités."},
  "Our animation team runs an energetic daytime programme from 10:00 poolside — aqua aerobics, beach volleyball tournaments, pool games, dance classes, cooking demos, and craft workshops keep guests of all ages engaged.": {de:"Unser Animationsteam bietet ab 10:00 ein energiegeladenes Tagesprogramm am Pool — Aqua-Aerobic, Beachvolleyball-Turniere, Poolspiele, Tanzkurse, Kochvorführungen und Bastelworkshops halten Gäste jeden Alters bei Laune.", ru:"Наша команда аниматоров проводит энергичную дневную программу с 10:00 у бассейна — аквааэробика, турниры по пляжному волейболу, игры в бассейне, уроки танцев, кулинарные шоу и мастер-классы увлекут гостей всех возрастов.", fr:"Notre équipe d'animation propose un programme diurne dynamique dès 10:00 au bord de la piscine — aquagym, tournois de beach-volley, jeux de piscine, cours de danse, démonstrations de cuisine et ateliers créatifs tiennent en haleine les clients de tous âges."},
  "The resort consists of a main building and several adjoining buildings set in a lush palm garden filled with exotic trees. It's a superb choice for a beach vacation — especially for families, thanks to the shallow water. Divers love the on-site diving centre, and the resort features an attractive pool area, one of the largest amphitheatres on the Red Sea, and extensive sports facilities.": {de:"Das Resort besteht aus einem Hauptgebäude und mehreren angrenzenden Gebäuden in einem üppigen Palmengarten voller exotischer Bäume. Es ist eine hervorragende Wahl für einen Strandurlaub — besonders für Familien, dank des flachen Wassers. Taucher lieben das Tauchzentrum vor Ort, und das Resort verfügt über einen attraktiven Poolbereich, eines der größten Amphitheater am Roten Meer und umfangreiche Sporteinrichtungen.", ru:"Курорт состоит из главного здания и нескольких прилегающих корпусов в пышном пальмовом саду с экзотическими деревьями. Это превосходный выбор для пляжного отдыха — особенно для семей благодаря мелководью. Дайверы любят местный дайвинг-центр, а на курорте есть привлекательная зона бассейнов, один из крупнейших амфитеатров на Красном море и обширные спортивные сооружения.", fr:"Le complexe se compose d'un bâtiment principal et de plusieurs bâtiments attenants nichés dans un luxuriant jardin de palmiers rempli d'arbres exotiques. C'est un choix superbe pour des vacances à la plage — en particulier pour les familles, grâce aux eaux peu profondes. Les plongeurs adorent le centre de plongée sur place, et le complexe dispose d'une belle zone de piscines, de l'un des plus grands amphithéâtres de la mer Rouge et d'installations sportives étendues."},

  /* ── ADDED: full DE/RU coverage (new intros, labels, testimonial) ── */
  "Admin": {de:"Admin", ru:"Админ", fr:"Admin"},
  "PIZZA NIGHT": {de:"PIZZA-ABEND", ru:"ВЕЧЕР ПИЦЦЫ", fr:"SOIRÉE PIZZA"},
  "\"Absolute highlight is the Golden Beach — 200 metres flat, perfect for kids. Solid wood loungers, sun and wind protection, perfect service.\"": {de:"„Das absolute Highlight ist der Golden Beach — 200 Meter flach, perfekt für Kinder. Massivholz-Liegen, Sonnen- und Windschutz, perfekter Service.“", ru:"«Безусловная изюминка — пляж Golden Beach: 200 метров мелководья, идеально для детей. Шезлонги из массива дерева, защита от солнца и ветра, безупречный сервис.»", fr:"« Le point fort absolu est la Golden Beach — 200 mètres de plat, parfaite pour les enfants. Transats en bois massif, protection contre le soleil et le vent, service impeccable. »"},
  "Things To Do": {de:"Aktivitäten", ru:"Чем заняться", fr:"Activités"},
  "Land, sea, and": {de:"Land, Meer und", ru:"Суша, море и", fr:"Terre, mer et"},
  "everything between": {de:"alles dazwischen", ru:"всё между ними", fr:"tout ce qu'il y a entre les deux"},
  "Dive the house reef, ride the aqua park, or unwind with beachside yoga — there is a new way to fill every day beside the Red Sea.": {de:"Tauchen Sie am Hausriff, erleben Sie den Aquapark oder entspannen Sie bei Yoga am Strand — am Roten Meer lässt sich jeder Tag neu gestalten.", ru:"Погрузитесь к домашнему рифу, прокатитесь в аквапарке или расслабьтесь на йоге у моря — каждый день у Красного моря можно провести по-новому.", fr:"Plongez sur le récif de la maison, profitez du parc aquatique ou détendez-vous avec une séance de yoga en bord de plage — il y a toujours une nouvelle façon de remplir chaque journée au bord de la mer Rouge."},
  "On Site": {de:"Vor Ort", ru:"На территории", fr:"Sur place"},
  "Every comfort,": {de:"Jeder Komfort,", ru:"Каждое удобство —", fr:"Tout le confort,"},
  "a short stroll away": {de:"nur wenige Schritte entfernt", ru:"в нескольких шагах", fr:"à quelques pas"},
  "Six freshwater pools, a full-service spa, fitness studio, kids’ club and boutiques — the whole resort is just steps from your room.": {de:"Sechs Süßwasserpools, ein Full-Service-Spa, Fitnessstudio, Kinderclub und Boutiquen — das ganze Resort ist nur wenige Schritte von Ihrem Zimmer entfernt.", ru:"Шесть пресноводных бассейнов, спа полного цикла, фитнес-студия, детский клуб и бутики — весь курорт всего в нескольких шагах от вашего номера.", fr:"Six piscines d'eau douce, un spa complet, un studio de fitness, un club enfants et des boutiques — tout le complexe est à quelques pas de votre chambre."},
  "In Pictures": {de:"In Bildern", ru:"В фотографиях", fr:"En images"},
  "Every shade of": {de:"Jede Facette", ru:"Все оттенки", fr:"Toutes les nuances d'une"},
  "a Red Sea day": {de:"eines Tages am Roten Meer", ru:"дня у Красного моря", fr:"journée en mer Rouge"},
  "From sunrise over the marina to the glow of the evening shows — browse the moments that capture life at Golden Beach Resort.": {de:"Vom Sonnenaufgang über dem Yachthafen bis zum Glanz der Abendshows — entdecken Sie die Momente, die das Leben im Golden Beach Resort einfangen.", ru:"От рассвета над мариной до сияния вечерних шоу — взгляните на моменты, передающие жизнь Golden Beach Resort.", fr:"Du lever du soleil sur la marina à l'éclat des spectacles du soir — parcourez les instants qui capturent la vie au Golden Beach Resort."},
  "LOBBY BAR": {de:"LOBBY-BAR", ru:"ЛОББИ-БАР", fr:"BAR DU LOBBY"},
  "SHOWTIME": {de:"SHOWZEIT", ru:"ВРЕМЯ ШОУ", fr:"SPECTACLE"},
  "SUMMER STAGE": {de:"SOMMERBÜHNE", ru:"ЛЕТНЯЯ СЦЕНА", fr:"SCÈNE D'ÉTÉ"},
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
    if(t.fr && String(t.fr).trim()) entry.fr = String(t.fr).trim();
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
    /* No whole-sentence translation available? Leave the element untouched so the
       per-node walker below translates each word-span on its own — that keeps the
       existing spans (and their .accent styling) intact. */
    if (!tr) return;
    /* Preserve the design in every language. The headline is a white "lead" phrase
       followed by a lime, underlined "accent" phrase (the .accent span). Translate
       the accent phrase on its own, find it inside the translated sentence, and
       rebuild the headline as  lead + accent  — so the lime word + underline always
       land on the right words, instead of slicing the sentence by raw word count
       (which left the accent span empty and scrambled the layout). */
    var accSpan = el.querySelector('.accent');
    var accEn = accSpan ? accSpan.textContent.replace(/\s+/g, ' ').trim() : '';
    var accTr = (accEn && DICT[accEn] && DICT[accEn][lang]) ? DICT[accEn][lang] : '';
    var lead = '', accent = '';
    var idx = accTr ? tr.toLowerCase().lastIndexOf(accTr.toLowerCase()) : -1;
    if (idx >= 0) {
      /* The accent phrase has its own translation and appears in the sentence:
         accent exactly those words (keeps the semantic accent, e.g. "golden sand"). */
      lead = tr.slice(0, idx).replace(/\s+$/, '');
      accent = tr.slice(idx);
    } else if (accSpan) {
      /* Any other translation — including free wording typed into the Admin portal,
         where the accent phrase can't be located — mirrors the built-in headline
         design: lime the last 1–2 words (the exact rule cms-apply.js uses for the
         English title). This keeps an accent in every language, so admin-entered
         translations never lose the design. */
      var w = tr.split(/\s+/);
      var n = w.length > 3 ? 2 : 1;
      var from = Math.max(0, w.length - n);
      lead = w.slice(0, from).join(' ');
      accent = w.slice(from).join(' ');
    } else {
      lead = tr;
    }
    /* Rebuild with ONE span per lead word plus a single accent span — the exact
       structure cms-apply.js uses for the English headline. This lets the words
       flow and wrap naturally (same as English); the accent phrase only drops to a
       new line when the text genuinely doesn't fit, never by construction. */
    el.innerHTML = '';
    var leadWords = lead ? lead.split(/\s+/) : [];
    var di = 0;
    leadWords.forEach(function (w) {
      var sp = document.createElement('span'); sp.className = 'word';
      sp.style.animationDelay = (0.9 + di * 0.12).toFixed(2) + 's'; di++;
      sp.textContent = w;
      el.appendChild(sp); el.appendChild(document.createTextNode(' '));
    });
    if (accent) {
      var sa = document.createElement('span'); sa.className = 'word accent';
      sa.style.animationDelay = (0.9 + di * 0.12).toFixed(2) + 's';
      sa.textContent = accent;
      el.appendChild(sa);
    } else if (!leadWords.length) {
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
