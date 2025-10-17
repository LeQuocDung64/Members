document.addEventListener('DOMContentLoaded', () => {

    const preloader = document.getElementById('preloader');

    /**
     * Chạy tất cả các hàm khởi tạo sau khi preloader ẩn đi.
     */
    function initializePageScripts() {
        console.log("Page scripts initialized.");

        initTypingEffects();
        initBouncingText();
        initIntersectionObservers();
        initHobbyScroller();
        initPyramidInteraction(); // Giữ nguyên hiệu ứng theo yêu cầu
        initNavLinks();
        initScrollToTopButton();
        initParticleCanvas();
        initTextOutlineEffect();
        initBlobEffect(); // Thêm hàm khởi tạo hiệu ứng blob
    }

    /**
     * Khởi tạo hiệu ứng gõ chữ cho tiêu đề và phần giới thiệu.
     */
    function initTypingEffects() {
        const typingTextElement = document.getElementById('typing-text');
        if (typingTextElement) {
            const textToType = "HUYNH THE HY";
            let charIndex = 0;

            function typeChar() {
                if (charIndex < textToType.length) {
                    typingTextElement.textContent += textToType.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, 150);
                }
            }
            setTimeout(() => {
                typingTextElement.classList.add('typing');
                typeChar();
            }, 500);
        }
    }

    /**
     * Khởi tạo hiệu ứng nảy chữ cho đoạn mô tả.
     */
    function initBouncingText() {
        const descriptionP = document.querySelector('.hero-text .description');
        if (descriptionP && descriptionP.textContent) {
            const words = descriptionP.textContent.trim().split(/\s+/);
            descriptionP.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
        }
    }

    /**
     * Hàm gõ chữ đa năng, có thể xử lý các thẻ HTML bên trong.
     * @param {HTMLElement} element - Phần tử để áp dụng hiệu ứng.
     * @param {number} speed - Tốc độ gõ (ms mỗi ký tự).
     */
    function typewriterEffect(element, speed = 10) {
        if (!element || !element.innerHTML) return;

        const originalHTML = element.innerHTML;
        element.innerHTML = '';
        element.classList.add('typing');
        element.classList.add('typed'); // Đánh dấu đã chạy để không lặp lại

        let i = 0;
        function type() {
            if (i < originalHTML.length) {
                const char = originalHTML.charAt(i);
                // Xử lý các thẻ HTML để không gõ ra từng ký tự của thẻ
                if (char === '<') {
                    const closingTagIndex = originalHTML.indexOf('>', i);
                    if (closingTagIndex !== -1) {
                        element.innerHTML += originalHTML.substring(i, closingTagIndex + 1);
                        i = closingTagIndex;
                    }
                } else {
                    element.innerHTML += char;
                }
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    /**
     * Khởi tạo Intersection Observers để xử lý animations, thanh kỹ năng,
     * và active nav link một cách hiệu quả.
     */
    function initIntersectionObservers() {
        const navLinks = document.querySelectorAll('header nav ul li a');
        const sections = document.querySelectorAll('main section[id]');

        // --- Observer cho việc active link trên thanh điều hướng ---
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Tìm link tương ứng với section đang được quan sát
                const correspondingLink = document.querySelector(`header nav a[href="#${entry.target.id}"]`);
                if (!correspondingLink) return;

                if (entry.isIntersecting) {
                    // Trước khi thêm 'active' cho link mới, xóa 'active' khỏi tất cả các link khác
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            });
        }, {
            rootMargin: "-50% 0px -50% 0px", // Kích hoạt khi section ở chính giữa màn hình
            threshold: 0 // Kích hoạt ngay khi section bắt đầu đi vào/ra khỏi vùng rootMargin
        });

        sections.forEach(section => {
            navObserver.observe(section);
        });


        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;

                    // Trigger animation
                    target.classList.add('is-visible');

                    // --- Dynamic Underline Logic for H2s ---
                    const h2 = target.querySelector('h2');
                    if (h2 && !h2.closest('.hero') && !h2.dataset.underlineStyled) {
                        const textWidth = h2.getBoundingClientRect().width;
                        let underlineWidth;
                        const underlineColor = window.getComputedStyle(h2).color;
                        underlineWidth = `${Math.max(50, Math.min(textWidth * 0.5, 220))}px`;

                        h2.style.setProperty('--underline-color', underlineColor);
                        h2.style.setProperty('--underline-width', underlineWidth);
                        h2.dataset.underlineStyled = 'true';
                    }

                    // Hiệu ứng gõ chữ cho "About Me"
                    const aboutMeText = target.querySelector('#about-me-text');
                    if (aboutMeText && !aboutMeText.classList.contains('typed')) {
                        typewriterEffect(aboutMeText);
                    }

                    // Hiệu ứng thanh tiến trình kỹ năng
                    const progressBars = target.querySelectorAll('.progress');
                    if (progressBars.length > 0) {
                        progressBars.forEach(progressDiv => {
                            const finalWidth = parseInt(progressDiv.getAttribute('data-width'));
                            progressDiv.style.width = `${finalWidth}%`;
                            const percentSpan = progressDiv.querySelector('.progress-percent');
                            if (percentSpan) {
                                let currentWidth = 0;
                                const animationDuration = 800; // Thời gian khớp với transition trong CSS (0.8s)
                                let startTime = null;

                                function animateCounter(timestamp) {
                                    if (!startTime) startTime = timestamp;
                                    const progress = timestamp - startTime;

                                    const value = Math.min(Math.floor((progress / animationDuration) * finalWidth), finalWidth);

                                    if (value > currentWidth) {
                                        currentWidth = value;
                                        percentSpan.textContent = `${currentWidth}%`;
                                    }
                                    if (progress < animationDuration) {
                                        requestAnimationFrame(animateCounter);
                                    }
                                }
                                requestAnimationFrame(animateCounter);
                            }
                        });
                    }

                    // Hiệu ứng biểu đồ tròn
                    const progressCircle = target.querySelector('.circular-progress');
                    if (progressCircle && !progressCircle.classList.contains('animated')) {
                        progressCircle.classList.add('animated');
                        const valueContainer = target.querySelector('.value-container');
                        const finalValue = parseInt(valueContainer.textContent);
                        let startValue = 0;

                        let progress = setInterval(() => {
                            startValue++;
                            valueContainer.textContent = `${startValue}%`;
                            progressCircle.style.background = `conic-gradient(var(--primary-color) ${startValue * 3.6}deg, rgba(0, 49, 64, 0.1) 0deg)`; // 10% độ mờ của text-color
                            if (startValue >= finalValue) {
                                clearInterval(progress);
                            }
                        }, 20);
                    }

                    // Hiệu ứng 3D cho kim tự tháp
                    const pyramid = target.querySelector('.pyramid-3d');
                    if (pyramid && !pyramid.classList.contains('animate-build')) {
                        pyramid.classList.add('animate-build');
                    }

                    // Ngừng theo dõi sau khi đã kích hoạt để tiết kiệm tài nguyên
                    animationObserver.unobserve(target);
                }
            });
        }, { threshold: 0.2 }); // Kích hoạt khi 20% phần tử hiển thị

        document.querySelectorAll('main section[id], .animate, section:not(.hero) h2:not(.animate)').forEach(el => {
            animationObserver.observe(el);
        });
    }

    /**
     * Khởi tạo hiệu ứng chữ chạy cho mục Hobbies.
     */
    function initHobbyScroller() {
        const scrollers = document.querySelectorAll(".scroller");
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            scrollers.forEach((scroller) => {
                const scrollerInner = scroller.querySelector(".scroller__inner");
                if (scrollerInner) {
                    const scrollerContent = Array.from(scrollerInner.children);
                    scrollerContent.forEach((item) => {
                        const duplicatedItem = item.cloneNode(true);
                        scrollerInner.appendChild(duplicatedItem);
                    });
                }
            });
        }
    }

    /**
     * [ĐƯỢC GIỮ NGUYÊN] Khởi tạo tương tác cho kim tự tháp kỹ năng mềm.
     */
    function initPyramidInteraction() {
        const softSkillsList = document.querySelector('.soft-skills-list');
        const pyramidContainer = document.querySelector('.pyramid-container-3d');
        const softSkillsBox = document.querySelector('.soft-skills-list')?.closest('.skill-box');

        if (!softSkillsList || !pyramidContainer) return;

        const skillItems = softSkillsList.querySelectorAll('li');
        const skillClasses = [
            'show-analytical-skill', 'show-communication-skill', 'show-business-acumen',
            'show-curiosity', 'show-teamwork'
        ];

        skillItems.forEach((item, index) => {
            const skillClass = skillClasses[index];
            if (skillClass) {
                item.addEventListener('mouseenter', () => pyramidContainer.classList.add(skillClass));
                item.addEventListener('mouseleave', () => pyramidContainer.classList.remove(skillClass));
            }
        });

    }

    /**
     * Thêm sự kiện click cuộn mượt cho các link trong navigation.
     */
    function initNavLinks() {
        // Bao gồm cả logo và các link trong nav để có hiệu ứng cuộn mượt
        const navLinks = document.querySelectorAll('header nav a, .logo');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    /**
     * Logic cho nút "Scroll to Top".
     */
    function initScrollToTopButton() {
        const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');
        if (scrollToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > window.innerHeight / 2) {
                    scrollToTopBtn.classList.add('show');
                } else {
                    scrollToTopBtn.classList.remove('show');
                }
            });
            scrollToTopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    /**
     * Khởi tạo hiệu ứng hạt (particle) cho background.
     */
    function initParticleCanvas() {
        const canvas = document.getElementById('particle-canvas');
        const heroSection = document.querySelector('.hero');
        if (!canvas || !heroSection) return;

        const ctx = canvas.getContext('2d');
        let particlesArray;
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;

        const mouse = { x: null, y: null, radius: (canvas.height / 100) * (canvas.width / 100) };
        window.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        });

        class Particle {
            constructor(x, y, dirX, dirY, size, color) {
                this.x = x; this.y = y; this.directionX = dirX; this.directionY = dirY;
                this.size = size; this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = '#8C5523';
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

                let dx = mouse.x - this.x; let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius + this.size) {
                    if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 5;
                    if (mouse.x > this.x && this.x > this.size * 10) this.x -= 5;
                    if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 5;
                    if (mouse.y > this.y && this.y > this.size * 10) this.y -= 5;
                }
                this.x += this.directionX; this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000; // Sử dụng primary-color cho hạt
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * (canvas.width - size * 4)) + size * 2; // Sử dụng primary-color cho hạt
                let y = (Math.random() * (canvas.height - size * 4)) + size * 2;
                let dirX = (Math.random() * 0.4) - 0.2;
                let dirY = (Math.random() * 0.4) - 0.2;
                particlesArray.push(new Particle(x, y, dirX, dirY, size, '#8C5523'));
            }
        }

        function connect() {
            const middleZoneThresholdX = canvas.width * 0.25; // 25% từ mỗi cạnh ngang
            const middleZoneThresholdY = canvas.height * 0.25; // 25% từ mỗi cạnh dọc

            // Hàm kiểm tra xem một hạt có nằm trong vùng giữa hay không
            const isParticleInMiddleZone = (p) => {
                return p.x > middleZoneThresholdX && p.x < (canvas.width - middleZoneThresholdX) &&
                       p.y > middleZoneThresholdY && p.y < (canvas.height - middleZoneThresholdY);
            };

            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                                 + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

                    // Điều kiện để vẽ đường nối:
                    // 1. Các hạt đủ gần nhau
                    // 2. KHÔNG PHẢI cả hai hạt đều nằm trong vùng giữa
                    if (distance < (canvas.width / 7) * (canvas.height / 7) &&
                        !(isParticleInMiddleZone(particlesArray[a]) && isParticleInMiddleZone(particlesArray[b]))) { // Sử dụng primary-color cho đường nối
                        let opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = 'rgba(140, 85, 31,' + opacityValue + ')';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) particlesArray[i].update();
            connect();
        }

        init();
        animate();

        window.addEventListener('resize', () => {
            canvas.width = heroSection.offsetWidth;
            canvas.height = heroSection.offsetHeight;
            mouse.radius = (canvas.height / 100) * (canvas.width / 100);
            init();
        });
    }

    /**
     * Bọc từng chữ cái của tiêu đề H2 trong thẻ span để tạo hiệu ứng viền chữ.
     */
    function initTextOutlineEffect() {
        // Select all h2s that need the span wrapping (except in hero section)
        const h2sToProcess = document.querySelectorAll('section:not(.hero) h2');
        h2sToProcess.forEach(h2 => {
            // Check if already processed to prevent re-wrapping
            if (!h2.dataset.processedOutline && h2.textContent) {
                const originalText = h2.textContent;
                h2.innerHTML = ''; // Clear content to wrap in spans

                for (let char of originalText) {
                    const span = document.createElement('span');
                    span.innerHTML = char === ' ' ? '&nbsp;' : char;
                    h2.appendChild(span);
                }
                h2.dataset.processedOutline = 'true'; // Mark as processed
            }
        });
    }

    /**
     * Khởi tạo hiệu ứng blob cho ảnh hero.
     * Thêm một class sau một khoảng trễ ngắn để kích hoạt animation.
     */
    function initBlobEffect() {
        const blobContainer = document.querySelector('.hero-image-container');
        if (blobContainer) {
            // Thêm class sau một khoảng trễ để animation bắt đầu mượt mà
            setTimeout(() => blobContainer.classList.add('animated-blob'), 500);
        }
    }

    // --- PRELOADER LOGIC ---
    window.addEventListener('load', () => {
        setTimeout(() => {
            if(preloader) {
                preloader.classList.add('hidden');
            }
            initializePageScripts();
        }, 500);
    });
});
