window.onload = function () {
    const parallax = document.querySelector('.parallax');
    const isSmartphone = window.matchMedia("(max-width: 768px)").matches; // Перевірка ширини екрану

    if (!isSmartphone) {
        if (parallax) {
            // Вибираємо елементи, які мають отримати паралакс-ефект
            const content = document.querySelector('.parallax__container');
            const mountain = document.querySelector('.images-parallax__mountain');
            const clouds = document.querySelector('.images-parallax__clouds');
            const human = document.querySelector('.images-parallax__human');

            // Визначаємо, наскільки сильний буде ефект паралаксу
            const forClouds = 40;
            const forMoutain = 20;
            const forHuman = 10;

            const speed = 0.05;

            let positionX = 0, positionY = 0;
            let coordXprocent = 0, coordYprocent = 0;

            // Функція для обробки скролінгу і встановлення паралаксу
            function setMouuseParallaxStyle() {

                const distX = coordXprocent - positionX;
                const distY = coordYprocent - positionY;

                positionX = positionX + (distX * speed)
                positionY = positionY + (distY * speed)

                // Отримуємо поточну позицію прокрутки
                const scrollPosition = window.scrollY;

                // Застосовуємо паралакс до різних об'єктів
                clouds.style.cssText = `transform: translate(${positionX / forClouds}%,${positionY / forClouds}%);`;
                mountain.style.cssText = `transform: translate(${positionX / forMoutain}%,${positionY / forMoutain}%);`;
                human.style.cssText = `transform: translate(${positionX / forHuman}%,${positionY / forHuman}%);`;

                requestAnimationFrame(setMouuseParallaxStyle);
            }
            setMouuseParallaxStyle();

            parallax.addEventListener("mousemove", function (e) {

                const parallaxWidth = parallax.offsetWidth;
                const parallaxHeight = parallax.offsetHeight;

                const coordX = e.pageX - parallaxWidth / 2;
                const coordY = e.pageY - parallaxHeight / 2;

                coordXprocent = coordX / parallaxWidth * 100;
                coordYprocent = coordY / parallaxHeight * 100;
            });

            //Parallax при скролі

            let thresholdSets = [];
            for (let i = 0; i <= 1.0; i += 0.005) {
                thresholdSets.push(i);
            }
            const callback = function (entries, observer) {
                const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
                setParallaxItemsStyle(scrollTopProcent);
            };
            const observer = new IntersectionObserver(callback, {
                threshold: thresholdSets
            });

            observer.observe(document.querySelector('.content'));

            function setParallaxItemsStyle(scrollTopProcent) {
                content.style.cssText = `transform: translate(0%,-${scrollTopProcent / 7}%);`;
                mountain.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 30}%);`;
                human.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 90}%);`;

            }
        }
    } else { // Якщо це смартфон
        // Вимикаємо ефект паралаксу для смартфонів
        const parallaxElements = document.querySelectorAll('.parallax__container, .images-parallax__mountain, .images-parallax__clouds, .images-parallax__human');
        parallaxElements.forEach(element => {
            element.style.cssText = 'transform: none;'; // Скасування ефекту паралаксу
        });
    }


    // Масив із посиланнями на відеоролики
    const videoSources = [
        'media.files/МЕРЗЕННА ВІСІМКА [ОФІЦІЙНИЙ ТРЕЙЛЕР].mp4',
        'media.files/Безславні виродки. Український трейлер (2009).mp4',
        'media.files/Острів проклятих - офіційний трейлер (український).mp4',
        'media.files/Bronson Official HD Trailer NOW ON DVD.mp4',
        'media.files/Drive - Movie Trailer (2011) HD.mp4',
        'media.files/Fight Club _ Бійцівський клуб (1999) _ Трейлер українською.mp4',
        'media.files/Only God Forgives - Official UK Trailer.mp4',
        'media.files/The Iron Giant_ Signature Edition - Official Trailer [HD].mp4',
        'media.files/The Place Beyond The Pines _ Official Trailer _ Starring Ryan Gosling and Bradley Cooper.mp4',
        'media.files/Вбивці квіткової повні. Фінальний трейлер.mp4',
        'media.files/ДЮНКЕРК. Офіційний головний трейлер (український) HD.mp4',
        'media.files/ТОЙ, ХТО БІЖИТЬ ПО ЛЕЗУ 2049. Офіційний трейлер 1 (український).mp4',
        'media.files/High-speed train. Official trailer (Ukrainian).mp4',
        'media.files/Blood Diamond (2006) Official Trailer - Leonardo DiCaprio Movie.mp4',
        'media.files/Fight Club - трейлер (мовою оригіналу з укр. субтитрами).mp4'
        // Додайте інші посилання на відеоролики
    ];


    const playButton = document.getElementById('playButton');
    const videoPlayer = document.getElementById('videoPlayer');
    const loadingGif = document.getElementById('loadingGif');

    let selectedMovies = [];

    playButton.addEventListener('click', function () {
        if (selectedMovies.length === videoSources.length) {
            selectedMovies = [];
        }

        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * videoSources.length);
        } while (selectedMovies.includes(randomIndex));

        selectedMovies.push(randomIndex);

        const randomVideoSource = videoSources[randomIndex];

        loadingGif.style.display = 'block';

        const gifDisplayTime = 1500;

        setTimeout(() => {
            loadingGif.style.display = 'none';
            videoPlayer.src = randomVideoSource;
            videoPlayer.load();
        }, gifDisplayTime);
    });



    const video = document.getElementById('videoPlayer');
    const toggleSoundButton = document.getElementById('toggle-sound');

    // Set the initial sound state
    let isSoundOn = true;

    // Function to toggle sound
    function toggleSound() {
        if (isSoundOn) {
            video.muted = true;
            toggleSoundButton.textContent = '🔉Вімкнути звук';
        } else {
            video.muted = false;
            toggleSoundButton.textContent = '🔇Вимкнути звук';
        }
        isSoundOn = !isSoundOn;
    }

    // Event listener for the button
    toggleSoundButton.addEventListener('click', toggleSound);
}