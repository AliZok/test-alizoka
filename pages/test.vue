<template>
    <div dir="rtl">
      <!-- Days of the Week -->
      <div class="mb-8 text-center">
        <div class="flex justify-between" dir="ltr">
          <div @click="goPrevMonth()">
            قبلی
          </div>
          <div>
            {{ shamsiMonths[indexMonthOfYearPrev].name }}
          </div>
          <div>
            {{ shamsiMonths[indexMonthOfYear].name }}
          </div>
          <div @click="goNextMonth()">بعدی</div>
        </div>
      </div>
  
      <!-- Days of the Month -->
      <div class="flex gap-4">
        <div>
          <div class="text-center days-of-week">
            <span v-for="day in daysssOfWeek" :key="day">{{ day }}</span>
          </div>
          <div class="days-grid">
            <!-- empty characters -->
            <span v-for="day in emptyDays" :key="day"></span>
  
            <!-- start days characters -->
            <span v-for="day in mainListDaysInMonth" :key="day" class="relative text-center day"
              :class="[{ 'opacity-50 bg-gray-400': day.reserved, 'hover:bg-[#b3f9e9]': !day.reserved, 'bg-lime-300': day.isToday }]">
              <div>{{ day.day }}</div>
  
              <div class="flex justify-center items-center gap-1 text-[10px] text-white" dir="ltr">
                <div v-if="day.discount" class="bg-rose-500 px-2 py-[2px] rounded-2xl">
                  {{ day.discount }}%
                </div>
                <div v-if="day.instantDiscount" class="bg-pink-400 px-2 py-[2px] rounded-2xl">{{ day.instantDiscount }}%</div>
              </div>
              <div v-if="day.lastMomentDiscount" class="top-1 right-1 absolute bg-green-300 px-1 rounded-full">a</div>
            </span>
          </div>
        </div>
  
        <div>
          <div class="text-center days-of-week">
            <span v-for="day in daysssOfWeek" :key="day">{{ day }}</span>
          </div>
          <div class="days-grid">
            <!-- empty characters -->
            <span v-for="day in emptyDaysPrev" :key="day"></span>
  
            <!-- start days characters -->
            <span v-for="day in mainListDaysInMonthPrev" :key="day" class="relative text-center day"
              :class="[{ 'opacity-50 bg-gray-400': day.reserved, 'hover:bg-[#b3f9e9]': !day.reserved, 'bg-lime-300': day.isToday }]">
              <div>{{ day.day }}</div>
  
              <div class="flex justify-center items-center gap-1 text-[10px] text-white" dir="ltr">
                <div v-if="day.discount" class="bg-rose-500 px-2 py-[2px] rounded-2xl">
                  {{ day.discount }}%
                </div>
                <div v-if="day.instantDiscount" class="bg-pink-400 px-2 py-[2px] rounded-2xl">{{ day.instantDiscount }}%</div>
              </div>
              <div v-if="day.lastMomentDiscount" class="top-1 right-1 absolute bg-green-300 px-1 rounded-full">a</div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { toJalaali, jalaaliToDateObject, isLeapJalaaliYear } from 'jalaali-js';
  
  const propertyDays = ref({
    bahman: {
      1: { reserved: true, discount: 25, lastMomentDiscount: 10 },
      2: { reserved: false, discount: 25, instantDiscount: 30 },
      8: { discount: 25, lastMomentDiscount: 10 },
    },
    dey: {
      4: { reserved: true, discount: 8, lastMomentDiscount: 10, instantDiscount: 30 },
    },
  });
  
  const daysssOfWeek = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
  
  const shamsiMonths = ref([
    { name: 'فروردین', enName: 'farvardin', days: 31 },
    { name: 'اردیبهشت', enName: 'ordibehesht', days: 31 },
    { name: 'خرداد', enName: 'khordad', days: 31 },
    { name: 'تیر', enName: 'tir', days: 31 },
    { name: 'مرداد', enName: 'mordad', days: 31 },
    { name: 'شهریور', enName: 'shahrivar', days: 31 },
    { name: 'مهر', enName: 'mehr', days: 30 },
    { name: 'آبان', enName: 'aban', days: 30 },
    { name: 'آذر', enName: 'azar', days: 30 },
    { name: 'دی', enName: 'dey', days: 30 },
    { name: 'بهمن', enName: 'bahman', days: 30 },
    { name: 'اسفند', enName: 'esfand', days: 29 }, // 29 or 30 depending on leap year
  ]);
  
  const emptyDays = ref(0);
  const emptyDaysPrev = ref(0);
  const indexMonthOfYear = ref(0);
  const indexMonthOfYearPrev = ref(0);
  const mainListDaysInMonth = ref([]);
  const mainListDaysInMonthPrev = ref([]);
  const toDay = ref({});
  const newDate = new Date();
  const showingMasterDate = new Date(newDate);
  const showingMasterDatePrev = new Date(newDate);
  const showingMasterDateJalali = ref({});
  const showingMasterDateJalaliPrev = ref({});
  
  toDay.value = toJalaali(newDate);
  
  const createshowingMasterDate = (numberOfNextMonth) => {
    showingMasterDate.setMonth(showingMasterDate.getMonth() + numberOfNextMonth);
    showingMasterDatePrev.setMonth(showingMasterDatePrev.getMonth() + numberOfNextMonth - 1);
  
    showingMasterDateJalali.value = toJalaali(showingMasterDate);
    showingMasterDateJalaliPrev.value = toJalaali(showingMasterDatePrev);
  
    const dateObject = jalaaliToDateObject(showingMasterDateJalali.value.jy, showingMasterDateJalali.value.jm, 1);
    const dateObjectPrev = jalaaliToDateObject(showingMasterDateJalaliPrev.value.jy, showingMasterDateJalaliPrev.value.jm, 1);
  
    emptyDays.value = convertToShamsiDayNumber(dateObject.getDay());
    emptyDaysPrev.value = convertToShamsiDayNumber(dateObjectPrev.getDay());
  
    indexMonthOfYear.value = getShamsiMonthNumber(showingMasterDate);
    indexMonthOfYearPrev.value = indexMonthOfYear.value - 1;
  
    // Handle the case where indexMonthOfYear is 0 (Farvardin)
    if (indexMonthOfYearPrev.value < 0) {
      indexMonthOfYearPrev.value = 11; // Set to Esfand
    }
  
    // If it's a leap year, Esfand has to be 30 days
    shamsiMonths.value[11].days = isLeapShowingYear.value ? 30 : 29;
  
    calculateDays();
  };
  
  const convertToShamsiDayNumber = (gregorianDay) => {
    return (gregorianDay + 1) % 7;
  };
  
  const calculateDays = () => {
    const propertyDaysEnt = Object.entries(propertyDays.value);
  
    const showingMonthEn = shamsiMonths.value[showingMasterDateJalali.value.jm - 1].enName;
    const showingMonthEnPrev = shamsiMonths.value[showingMasterDateJalaliPrev.value.jm - 1].enName;
  
    const showingMonthDays = shamsiMonths.value[showingMasterDateJalali.value.jm - 1].days;
    const showingMonthDaysPrev = shamsiMonths.value[showingMasterDateJalaliPrev.value.jm - 1].days;
  
    let parseProperties = [];
    let parsePropertiesPrev = [];
  
    propertyDaysEnt.forEach((itemMonth) => {
      if (showingMonthEn == itemMonth[0]) {
        parseProperties = Object.entries(itemMonth[1]);
      }
  
      if (showingMonthEnPrev == itemMonth[0]) {
        parsePropertiesPrev = Object.entries(itemMonth[1]);
      }
    });
  
    mainListDaysInMonth.value = [];
    for (let counter = 1; counter <= showingMonthDays; counter++) {
      let oneDayList = { day: counter };
  
      parseProperties.forEach((itemProperty) => {
        if (itemProperty[0] == counter) {
          oneDayList = { ...oneDayList, ...itemProperty[1] };
        }
      });
  
      mainListDaysInMonth.value.push(oneDayList);
    }
  
    mainListDaysInMonthPrev.value = [];
    for (let counter = 1; counter <= showingMonthDaysPrev; counter++) {
      let oneDayList = { day: counter };
  
      parsePropertiesPrev.forEach((itemProperty) => {
        if (itemProperty[0] == counter) {
          oneDayList = { ...oneDayList, ...itemProperty[1] };
        }
      });
  
      mainListDaysInMonthPrev.value.push(oneDayList);
    }
  
    if (showingMasterDateJalali.value.jm == toDay.value.jm && showingMasterDateJalali.value.jy == toDay.value.jy) {
      mainListDaysInMonth.value[toDay.value.jd - 1].isToday = true;
    }
  
    if (showingMasterDateJalaliPrev.value.jm == toDay.value.jm && showingMasterDateJalaliPrev.value.jy == toDay.value.jy) {
      mainListDaysInMonthPrev.value[toDay.value.jd - 1].isToday = true;
    }
  };
  
  const getShamsiMonthNumber = (gregorianDate) => {
    const shamsiDate = toJalaali(
      gregorianDate.getFullYear(),
      gregorianDate.getMonth(),
      gregorianDate.getDate()
    );
    return shamsiDate.jm;
  };
  
  const goNextMonth = () => {
    createshowingMasterDate(1);
  };
  
  const goPrevMonth = () => {
    createshowingMasterDate(-1);
  };
  
  const isLeapShowingYear = computed(() => isLeapJalaaliYear(showingMasterDateJalali.value?.jy));
  
  onMounted(() => {
    createshowingMasterDate(0);
  });
  </script>
  
  <style scoped>
  .days-of-week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    margin-bottom: 10px;
  }
  
  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
  }
  
  .days-grid span {
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .day {
    box-shadow: 2px 2px 5px #d7dad9;
  }
  </style>