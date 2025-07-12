// ====== Back to Top Button ======
// สร้างปุ่ม "กลับสู่ด้านบน"
const backToTopButton = document.createElement('button');
backToTopButton.setAttribute('id', 'backToTopBtn');
backToTopButton.innerHTML = '&#9650;'; // สัญลักษณ์ลูกศรขึ้น
document.body.appendChild(backToTopButton);

// แสดง/ซ่อนปุ่มเมื่อเลื่อนหน้าจอ
window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

// คลิกปุ่มเพื่อเลื่อนกลับไปด้านบน
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // เลื่อนแบบนุ่มนวล
    });
});

// ====== Smooth Scroll for Navigation Links ======
document.querySelectorAll('nav ul.menu li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // ตรวจสอบว่าเป็นลิงก์ภายในหน้า (hash link) หรือไม่ และไม่ใช่ลิงก์ไปหน้าอื่น
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault(); // ป้องกันการกระโดดทันที

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // เลื่อนแบบนุ่มนวล
                });
            }
        }
        // ถ้าเป็นลิงก์ไปหน้าอื่น (เช่น index.html, skill.html) จะไม่ทำ smooth scroll
    });
});


// ====== Fade-in/Slide-in on Scroll Effect ======
const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // เมื่อ 10% ขององค์ประกอบมองเห็นได้
};

const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible'); // เพิ่มคลาสเมื่อมองเห็น
            observer.unobserve(entry.target); // หยุดสังเกตหลังจากแสดงผลแล้ว (เลือกได้ว่าจะใช้หรือไม่)
        }
    });
}, observerOptions);

// เลือกองค์ประกอบที่ต้องการให้มีเอฟเฟกต์
// ในตัวอย่างนี้คือ section.maincontent, section.content, และ .contact
document.querySelectorAll('section.maincontent, section.content, .contact, .content-item').forEach(element => {
    element.classList.add('fade-in-on-scroll'); // เพิ่มคลาสเริ่มต้น
    fadeInObserver.observe(element);
});

// สำหรับรูปภาพใน .maincontent-img และ .content-item img
document.querySelectorAll('.maincontent-img img, .content-item img').forEach(img => {
    img.classList.add('fade-in-on-scroll');
    fadeInObserver.observe(img);
});