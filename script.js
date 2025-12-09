
const API_BASE = `${location.protocol}//${location.hostname}:8000`;

// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation active au scroll ---
    const updateNavActiveState = () => {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPath = link.getAttribute('href').split('/').pop();
            if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
                link.classList.add('active');
            }
        });
    };
    updateNavActiveState();


    // --------------------------------------------------------------------------------------
    // --- Logique spécifique à 'jumeau-virtuel.html' ---
    // --------------------------------------------------------------------------------------
    if (document.getElementById('jumeau-virtuel')) {
        const plantTypeSelect = document.getElementById('plantType');
        const simulatePlantingBtn = document.getElementById('simulatePlantingBtn');
        const simulationResult = document.getElementById('simulationResult');

        if (simulatePlantingBtn) {
            simulatePlantingBtn.addEventListener('click', () => {
                const selectedPlant = plantTypeSelect.value;
                let resultText = '';
                let resultClass = '';
                let yieldPercentage = 0;

                // Logique de simulation fictive
                switch(selectedPlant) {
                    case 'tomate':
                        yieldPercentage = 90 + Math.floor(Math.random() * 5); // 90-94%
                        resultText = `Pour les <span class="fw-bold">Tomates</span>: <br>Excellent choix ! Le sol virtuel est très propice. <br>Rendement estimé: <span class="fw-bold">${yieldPercentage}%</span>.`;
                        resultClass = 'alert-success';
                        break;
                    case 'ble':
                        yieldPercentage = 70 + Math.floor(Math.random() * 10); // 70-79%
                        resultText = `Pour le <span class="fw-bold">Blé</span>: <br>Bon potentiel, mais nécessite une irrigation optimisée. <br>Rendement estimé: <span class="fw-bold">${yieldPercentage}%</span>.`;
                        resultClass = 'alert-warning';
                        break;
                    case 'salade':
                        yieldPercentage = 55 + Math.floor(Math.random() * 10); // 55-64%
                        resultText = `Pour la <span class="fw-bold">Salade</span>: <br>Le pH du sol est légèrement acide. <br>Rendement estimé: <span class="fw-bold">${yieldPercentage}%</span>. (Ajout de chaux recommandé)`;
                        resultClass = 'alert-danger';
                        break;
                    case 'mais':
                        yieldPercentage = 80 + Math.floor(Math.random() * 10); // 80-89%
                        resultText = `Pour le <span class="fw-bold">Maïs</span>: <br>Très adapté au climat actuel simulé. <br>Rendement estimé: <span class="fw-bold">${yieldPercentage}%</span>.`;
                        resultClass = 'alert-info';
                        break;
                    default:
                        resultText = `Veuillez sélectionner un type de plante.`;
                        resultClass = 'alert-info';
                }
                
                simulationResult.innerHTML = resultText;
                simulationResult.className = `mt-3 alert ${resultClass} animate__animated animate__fadeIn`;
                simulationResult.classList.remove('d-none');
            });
        }
    }

    // --------------------------------------------------------------------------------------
    // --- Logique spécifique à 'surveillance-sante.html' ---
    // --------------------------------------------------------------------------------------
    if (document.getElementById('surveillance-sante')) {
        const healthStatusList = document.getElementById('healthStatusList');
        const refreshHealthBtn = document.getElementById('refreshHealthBtn');

        const generateFakeHealthData = () => {
            const plants = [
                { name: 'Plante A', type: 'Tomate', status: 'Sain', icon: 'bi-check-circle', class: 'success' },
                { name: 'Plante B', type: 'Blé', status: 'Stress Léger', icon: 'bi-exclamation-triangle', class: 'warning' },
                { name: 'Plante C', type: 'Salade', status: 'Maladie Détectée', icon: 'bi-bug', class: 'danger' },
                { name: 'Plante D', type: 'Maïs', status: 'Croissance Optimale', icon: 'bi-graph-up', class: 'info' },
            ];

            // Simuler une évolution
            plants[1].status = Math.random() > 0.5 ? 'Sain' : 'Stress Léger';
            plants[1].icon = plants[1].status === 'Sain' ? 'bi-check-circle' : 'bi-exclamation-triangle';
            plants[1].class = plants[1].status === 'Sain' ? 'success' : 'warning';

            plants[2].status = Math.random() > 0.7 ? 'Maladie Détectée' : 'Récupération';
            plants[2].icon = plants[2].status === 'Maladie Détectée' ? 'bi-bug' : 'bi-shield-fill-check';
            plants[2].class = plants[2].status === 'Maladie Détectée' ? 'danger' : 'primary';


            let listHtml = '<ul class="list-group list-group-flush text-start">';
            plants.forEach(plant => {
                listHtml += `
                    <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent border-bottom animate__animated animate__fadeIn">
                        <span class="text-${plant.class}"><i class="bi ${plant.icon} me-2"></i> <span class="fw-bold">${plant.name}</span> (${plant.type}) : ${plant.status}</span>
                        <button class="btn btn-sm btn-outline-${plant.class}">Voir Fiche</button>
                    </li>
                `;
            });
            listHtml += '</ul>';
            healthStatusList.innerHTML = listHtml;
        };
        
        if (refreshHealthBtn) {
            refreshHealthBtn.addEventListener('click', generateFakeHealthData);
            generateFakeHealthData(); // Afficher au chargement
        }
    }


    // --------------------------------------------------------------------------------------
    // --- Logique spécifique à 'previsions-irrigation.html' (API et Carte Réelle) ---
    // --------------------------------------------------------------------------------------
    if (document.getElementById('previsions-irrigation')) {
        
        // 🔑 REMPLACER PAR VOTRE CLÉ API OPENWEATHERMAP RÉELLE
        const OPENWEATHER_API_KEY = "00543c3ca5836b9e499467764d321a1c" ; 

        // 📍 Coordonnées par défaut (Tunis, Tunisie)
        const LATITUDE = 36.8065; 
        const LONGITUDE = 10.1815; 
        const ZOOM_LEVEL = 7; // Zoom pour englober la Tunisie

        const weatherForecastDiv = document.getElementById('weatherForecast');
        const irrigationAlertDiv = document.getElementById('irrigationAlert');
        const refreshWeatherBtn = document.getElementById('refreshWeatherBtn');
        const irrigationRecommendationDiv = document.getElementById('irrigationRecommendation');
        
        // --- 1. Initialisation de la Carte Leaflet ---
        let map = null;

        const initMap = () => {
            if (map !== null) {
                map.remove(); // Nettoyer l'ancienne instance si elle existe
            }
            
            // Créer la carte centrée sur Tunis
            map = L.map('map').setView([LATITUDE, LONGITUDE], ZOOM_LEVEL);

            // Ajouter la couche de base (OpenStreetMap)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }).addTo(map);

            // Ajouter la couche de précipitations (Rain) d'OpenWeatherMap
            // Remarquez l'utilisation de la clé API ici aussi.
            const rainLayer = L.tileLayer(`https://tile.openweathermap.org/map/rain_new/{z}/{x}/{y}.png?appid=${OPENWEATHER_API_KEY}`, {
                opacity: 0.6, // Rendre la couche pluie semi-transparente
                attribution: 'Météo par OpenWeatherMap'
            }).addTo(map);

            // Ajuster la vue pour la Tunisie (bordures réelles)
            // On peut définir des limites pour que l'utilisateur reste sur la Tunisie
            const bounds = L.latLngBounds([[30.0, 7.0], [38.0, 12.0]]); 
            map.setMaxBounds(bounds);
        };
        
        // --- 2. Logique du Graphique d'Humidité ---
        const moistureCtx = document.getElementById('moistureChart');
        let moistureChart;

        const generateFakeMoistureData = (rainTomorrowExpected, totalRainTomorrow) => {
            const labels = ['-8h', '-6h', '-4h', '-2h', 'Maintenant', '+2h', '+4h', '+6h', '+8h', '+10h'];
            let currentMoisture = Array(labels.length).fill(0).map((_, i) => {
                if (i <= 4) return Math.max(30, 80 - i * 8 + Math.random() * 5);
                return 0;
            });
            currentMoisture[4] = Math.max(30, 70 - Math.random() * 10); // Humidité actuelle

            let futureMoisture = currentMoisture.slice();
            for (let i = 5; i < labels.length; i++) {
                if (rainTomorrowExpected && i >= 5) {
                    // Augmentation de l'humidité si pluie prévue
                    futureMoisture[i] = Math.min(100, futureMoisture[i-1] + (totalRainTomorrow / 10) * 2 + Math.random() * 5);
                } else {
                    // Baisse progressive si pas de pluie
                    futureMoisture[i] = Math.max(20, futureMoisture[i-1] - 5 + Math.random() * 3);
                }
            }
            return { labels, currentMoisture, futureMoisture };
        };

        const updateMoistureChart = (rainTomorrowExpected, totalRainTomorrow) => {
            const { labels, currentMoisture, futureMoisture } = generateFakeMoistureData(rainTomorrowExpected, totalRainTomorrow);

            if (moistureChart) {
                moistureChart.data.labels = labels;
                moistureChart.data.datasets[0].data = currentMoisture.map((val, i) => i > 4 ? null : val); 
                moistureChart.data.datasets[1].data = futureMoisture.map((val, i) => i < 4 ? null : val);
                moistureChart.update();
            } else {
                moistureChart = new Chart(moistureCtx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Humidité du Sol Historique (%)',
                                data: currentMoisture.map((val, i) => i > 4 ? null : val),
                                borderColor: '#28a745', 
                                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                                fill: true,
                                tension: 0.3
                            },
                            {
                                label: 'Prévision Humidité du Sol (%)',
                                data: futureMoisture.map((val, i) => i < 4 ? null : val),
                                borderColor: '#007bff', 
                                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                                fill: false,
                                borderDash: [5, 5],
                                tension: 0.3
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100,
                                title: { display: true, text: 'Humidité (%)' }
                            },
                            x: {
                                title: { display: true, text: 'Temps' }
                            }
                        }
                    }
                });
            }
        };

        // --- 3. Fonction API et Logique d'Irrigation ---
        const fetchWeatherData = async () => {
            if (OPENWEATHER_API_KEY === "VOTRE_CLE_API_OPENWEATHERMAP_ICI") {
                 weatherForecastDiv.innerHTML = '<div class="col-12 text-center"><p class="text-danger"><i class="bi bi-key-fill me-2"></i> **Erreur API :** Veuillez insérer votre vraie clé OpenWeatherMap dans `script.js`.</p></div>';
                 irrigationRecommendationDiv.innerHTML = '<p class="text-danger">Clé API manquante pour la recommandation.</p>';
                 updateMoistureChart(false, 0); 
                 return;
            }

            const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=fr`;

            try {
                weatherForecastDiv.innerHTML = '<div class="col-12 text-center"><p class="text-info"><i class="bi bi-arrow-clockwise animate__animated animate__rotateIn animate__infinite"></i> Récupération des données météo...</p></div>';

                const response = await fetch(weatherUrl);
                if (!response.ok) {
                    throw new Error(`Erreur de l'API Météo: ${response.status} - ${response.statusText}`);
                }
                const data = await response.json();
                
                let forecastHtml = '';
                let rainTomorrowExpected = false;
                let totalRainTomorrow = 0;
                let todayRain = 0;
                
                // Regroupement des données par jour (pour avoir un seul affichage par jour)
                const dailyData = {};
                data.list.forEach(f => {
                    const date = new Date(f.dt * 1000);
                    const dayKey = date.toISOString().split('T')[0];
                    if (!dailyData[dayKey]) {
                        // Initialisation des données pour la journée
                        dailyData[dayKey] = { temp_max: -Infinity, temp_min: Infinity, rain: 0, mainDescription: f.weather[0].description, icon: f.weather[0].icon };
                    }
                    
                    // Mise à jour des températures min/max
                    dailyData[dayKey].temp_max = Math.max(dailyData[dayKey].temp_max, f.main.temp_max);
                    dailyData[dayKey].temp_min = Math.min(dailyData[dayKey].temp_min, f.main.temp_min);
                    
                    // Cumul de la pluie sur 3h
                    dailyData[dayKey].rain += (f.rain && f.rain['3h']) ? f.rain['3h'] : 0;
                    
                    // Mémoriser la description de la journée la plus proche de midi pour l'icône
                    const hour = date.getHours();
                    if (hour >= 12 && hour <= 15) {
                         dailyData[dayKey].mainDescription = f.weather[0].description;
                         dailyData[dayKey].icon = f.weather[0].icon;
                    }
                });

                const sortedDays = Object.keys(dailyData).sort();

                sortedDays.slice(0, 5).forEach((dayKey, index) => {
                    const f = dailyData[dayKey];
                    const date = new Date(dayKey);
                    const dayName = index === 0 ? 'Aujourd\'hui' : (index === 1 ? 'Demain' : date.toLocaleDateString('fr-FR', { weekday: 'long' }));
                    
                    const iconUrl = `https://openweathermap.org/img/wn/${f.icon}@2x.png`;
                    const rainText = f.rain > 0.1 ? `<span class="text-primary fw-bold">(${f.rain.toFixed(1)}mm)</span>` : `(Sec)`;
                    
                    forecastHtml += `
                        <div class="col-lg-2 col-md-4 col-sm-6 animate__animated animate__zoomIn forecast-card">
                            <div class="card shadow-sm h-100 text-center border-${f.rain > 5 ? 'primary' : (f.rain > 0.1 ? 'info' : 'secondary')}">
                                <div class="card-body">
                                    <h5 class="card-title text-capitalize">${dayName}</h5>
                                    <img src="${iconUrl}" alt="${f.mainDescription}" class="my-2" style="width: 60px;">
                                    <p class="card-text mb-1">${Math.round(f.temp_max)}°C / ${Math.round(f.temp_min)}°C</p>
                                    <p class="card-text text-muted">${f.mainDescription}</p>
                                    ${rainText}
                                </div>
                            </div>
                        </div>`;
                    
                    if (index === 0) {
                        todayRain = f.rain;
                    } else if (index === 1) { // Demain
                        totalRainTomorrow = f.rain;
                        if (totalRainTomorrow > 5) { 
                            rainTomorrowExpected = true;
                        }
                    }
                });

                weatherForecastDiv.innerHTML = forecastHtml;

                // --- Logique d'Irrigation ---
                const SOIL_MOISTURE_THRESHOLD = 45; // Seuil d'humidité basse
                const RAIN_ALERT_THRESHOLD = 5; // Seuil de pluie importante (en mm)

                const soilMoisture = Math.floor(Math.random() * 40) + 30; // 30-70% (Simulé)

                let recText = '';
                if (rainTomorrowExpected) {
                    recText = `<span class="text-primary"><i class="bi bi-cloud-rain-fill me-2"></i> **Recommandation :** Pluie forte prévue demain (${totalRainTomorrow.toFixed(1)}mm). **Suspendre l'arrosage.**</span>`;
                    irrigationAlertDiv.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i> **ALERTE IRRIGATION (PLUIE) :** Arrosage automatique suspendu en prévision des précipitations.`;
                    irrigationAlertDiv.classList.remove('d-none', 'alert-danger');
                    irrigationAlertDiv.classList.add('alert-warning');
                } else if (soilMoisture < SOIL_MOISTURE_THRESHOLD && todayRain < RAIN_ALERT_THRESHOLD) {
                    recText = `<span class="text-danger"><i class="bi bi-exclamation-triangle-fill me-2"></i> **Recommandation :** Humidité du sol basse (${soilMoisture}%). **Arrosage IMMÉDIAT nécessaire.**</span>`;
                    irrigationAlertDiv.innerHTML = `<i class="bi bi-exclamation-octagon-fill me-2"></i> **ALERTE SÉCHERESSE :** Humidité critique (${soilMoisture}%), action requise !`;
                    irrigationAlertDiv.classList.remove('d-none', 'alert-warning');
                    irrigationAlertDiv.classList.add('alert-danger');
                } else {
                    recText = `<span class="text-success"><i class="bi bi-check-circle-fill me-2"></i> **Recommandation :** Humidité du sol optimale (${soilMoisture}%). Pas d'arrosage nécessaire.</span>`;
                    irrigationAlertDiv.classList.add('d-none');
                }
                
                irrigationRecommendationDiv.innerHTML = recText;
                
                // Mettre à jour le graphique
                updateMoistureChart(rainTomorrowExpected, totalRainTomorrow);
                
                return { rainTomorrowExpected, totalRainTomorrow };

            } catch (error) {
                console.error("Erreur lors de la récupération des données météo:", error);
                weatherForecastDiv.innerHTML = '<div class="col-12 text-center"><p class="text-danger"><i class="bi bi-exclamation-octagon-fill me-2"></i> Erreur lors du chargement des prévisions. Problème de connexion ou clé API invalide.</p></div>';
                irrigationRecommendationDiv.innerHTML = '<p class="text-danger">Impossible de déterminer la recommandation d\'arrosage.</p>';
                irrigationAlertDiv.classList.add('d-none');
                updateMoistureChart(false, 0); 
                return { rainTomorrowExpected: false, totalRainTomorrow: 0 };
            }
        };

        if (refreshWeatherBtn) {
            refreshWeatherBtn.addEventListener('click', fetchWeatherData);
        }
        
        // Initialisation au chargement de la page
        initMap(); // 1. Initialiser la carte Leaflet
        fetchWeatherData(); // 2. Récupérer les données météo et mettre à jour le graphique

        // Mettre à jour les données météo toutes les 10 minutes
        setInterval(fetchWeatherData, 600000); 
    }

});