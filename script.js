// تصفية أطباق القائمة حسب الصنف
const filterButtons = document.querySelectorAll('.filter-button');
const dishCards = document.querySelectorAll('.dish-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedCategory = button.dataset.filter;

    // نحدّث شكل الزر وحالته
    filterButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle('is-active', isSelected);
      item.setAttribute('aria-pressed', String(isSelected));
    });

    // نظهر غير الأطباق اللي كتنتمي للصنف المختار
    dishCards.forEach((card) => {
      const matches = selectedCategory === 'all' || card.dataset.category === selectedCategory;
      card.hidden = !matches;
    });
  });
});

// فتح وإغلاق قائمة التنقل في الهاتف
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'إغلاق القائمة' : 'فتح القائمة');
  menuToggle.textContent = isOpen ? '×' : '☰';
});

// منين الزائر يختار رابط فالهاتف، نسدو القائمة
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'فتح القائمة');
    menuToggle.textContent = '☰';
  });
});


// نموذج حجز تجريبي: يعرض تأكيداً داخل الصفحة ولا يرسل البيانات لأي جهة
const reservationForm = document.getElementById('reservationForm');
const reservationDate = document.getElementById('reservationDate');
const reservationStatus = document.getElementById('reservationStatus');

if (reservationForm && reservationDate && reservationStatus) {
  // منع اختيار تاريخ مضى
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  reservationDate.min = localToday;

  reservationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!reservationForm.reportValidity()) return;

    const guestName = reservationForm.elements.guestName.value.trim();
    const date = reservationForm.elements.reservationDate.value;
    const time = reservationForm.elements.reservationTime.value;
    const count = reservationForm.elements.guestCount.value;

    reservationStatus.textContent = `شكراً ${guestName}! هذا تأكيد تجريبي لحجز ${count} أشخاص يوم ${date} على الساعة ${time}. لم يتم إرسال الطلب أو حفظ البيانات.`;
    reservationForm.reset();
    reservationDate.min = localToday;
  });
}
