class DatePicker {
    constructor(inputSelector, options = {}) {
        this.input = document.querySelector(inputSelector);
        this.container = document.getElementById('datepicker');
        this.monthYearElement = document.getElementById('monthYear');
        this.daysContainer = document.getElementById('daysContainer');
        this.prevBtn = document.getElementById('prevMonth');
        this.nextBtn = document.getElementById('nextMonth');
        
        this.currentDate = new Date();
        this.selectedDate = null;
        this.minDate = new Date();
        
        this.months = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];
        
        this.init();
    }
    
    init() {
        this.render();
        this.bindEvents();
    }
    
    bindEvents() {
        this.input.addEventListener('click', (e) => {
            e.preventDefault();
            this.show();
        });
        
        this.input.addEventListener('focus', (e) => {
            e.preventDefault();
            this.show();
        });
        
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target) && e.target !== this.input) {
                this.hide();
            }
        });
        
        this.prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.render();
        });
        
        this.nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.render();
        });
        
        this.daysContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('datepicker__day') && 
                !e.target.classList.contains('datepicker__day--disabled')) {
                
                const day = parseInt(e.target.textContent);
                const isOtherMonth = e.target.classList.contains('datepicker__day--other-month');
                
                if (isOtherMonth) {
                    const direction = e.target.classList.contains('datepicker__day--prev-month') ? -1 : 1;
                    this.currentDate.setMonth(this.currentDate.getMonth() + direction);
                    this.render();
                    return;
                }
                
                this.selectDate(day);
            }
        });
    }
    
    render() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        this.monthYearElement.textContent = `${this.months[month]} ${year}`;
        
        this.renderDays(year, month);
    }
    
    renderDays(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        const startingDayAdjusted = startingDay === 0 ? 6 : startingDay - 1; 
        
        const prevMonth = new Date(year, month - 1, 0);
        const daysInPrevMonth = prevMonth.getDate();
        
        const nextMonth = new Date(year, month + 1, 1);
        
        this.daysContainer.innerHTML = '';
        
        for (let i = startingDayAdjusted - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            const dayElement = this.createDayElement(day, true, 'prev');
            this.daysContainer.appendChild(dayElement);
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = this.createDayElement(day, false);
            this.daysContainer.appendChild(dayElement);
        }
        
        const totalCells = 42;
        const remainingCells = totalCells - (startingDayAdjusted + daysInMonth);
        
        for (let day = 1; day <= remainingCells; day++) {
            const dayElement = this.createDayElement(day, true, 'next');
            this.daysContainer.appendChild(dayElement);
        }
    }
    
    createDayElement(day, isOtherMonth, monthType = null) {
        const dayElement = document.createElement('div');
        dayElement.className = 'datepicker__day';
        dayElement.textContent = day;
        
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        let dayDate;
        if (isOtherMonth) {
            const monthOffset = monthType === 'prev' ? -1 : 1;
            dayDate = new Date(year, month + monthOffset, day);
            dayElement.classList.add('datepicker__day--other-month');
            if (monthType === 'prev') {
                dayElement.classList.add('datepicker__day--prev-month');
            }
        } else {
            dayDate = new Date(year, month, day);
        }
        
        if (dayDate < this.minDate) {
            dayElement.classList.add('datepicker__day--disabled');
        }
        
        if (this.selectedDate && 
            this.selectedDate.getDate() === day &&
            this.selectedDate.getMonth() === (isOtherMonth ? month + (monthType === 'prev' ? -1 : 1) : month) &&
            this.selectedDate.getFullYear() === year) {
            dayElement.classList.add('datepicker__day--selected');
        }
        
        return dayElement;
    }
    
    selectDate(day) {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        const selectedDate = new Date(year, month, day);
        
        if (selectedDate < this.minDate) {
            return;
        }
        
        this.selectedDate = selectedDate;
        
        const formattedDate = this.formatDate(this.selectedDate);
        this.input.value = formattedDate;
        
        this.hide();
        this.render();
    }
    
    formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }
    
    show() {
        this.container.style.display = 'block';
        this.container.classList.add('datepicker--visible');
    }
    
    hide() {
        this.container.style.display = 'none';
        this.container.classList.remove('datepicker--visible');
    }
}