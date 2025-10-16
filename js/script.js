document.addEventListener('DOMContentLoaded', () => 
{
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.card');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let chiSoHienTai = 0; 
    const tongSoThe = cards.length; 
    const gocMoiThe = 360 / tongSoThe; 

    function capNhatVongXoay() 
    {
        const gocXoayTong = -chiSoHienTai * gocMoiThe;
        carousel.style.transform = `rotateY(${gocXoayTong}deg)`;
        const banKinh = 350;
        // Lặp qua từng thẻ để đặt chúng vào đúng vị trí và cập nhật độ mờ
        cards.forEach((the, chiSo) => 
        {
            // Tính toán góc riêng của mỗi thẻ trên vòng tròn
            const gocCuaThe = chiSo * gocMoiThe;
            the.style.transform = `translate(-50%, -50%) rotateY(${gocCuaThe}deg) translateZ(${banKinh}px)`;
            // Khoảng cách vị trí giữa thẻ chính diện và thẻ hiện tại
            const khoangCachViTri = Math.abs(chiSoHienTai - chiSo);
            // Kiểm tra xem thẻ có nên được hiển thị rõ hay không
            const duocHienThi = khoangCachViTri <= 2 || khoangCachViTri >= tongSoThe - 2;
            the.style.opacity = duocHienThi ? '1' : '0';
        });
    }
    nextBtn.addEventListener('click', () => 
    {
        chiSoHienTai++;
        capNhatVongXoay();
    });
    prevBtn.addEventListener('click', () => 
    {
        chiSoHienTai--;
        capNhatVongXoay();
    });
    capNhatVongXoay();
});