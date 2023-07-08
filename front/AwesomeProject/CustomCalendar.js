import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['es'] = {
  monthNames: [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Mar.',
    'Abr.',
    'May.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dic.',
  ],
  dayNames: [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ],
  dayNamesShort: ['Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.', 'Dom.'],
  today: 'Hoy',
};

LocaleConfig.defaultLocale = 'es';

const CustomCalendar = () => {
  const currentDate = new Date();
  const currentDay = currentDate.toISOString().split('T')[0];
  const currentMonth = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-01`;

  const monthsToShow = 12; // Número de meses a mostrar

  const renderHeader = (date) => {
    const monthName = LocaleConfig.locales['es'].monthNames[date.getMonth()];
    const year = date.getFullYear();
    return (
      <View style={{ marginBottom: 10, width: '100%', justifyContent: 'flex-start' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'left', color: 'white', }}>{`${monthName} ${year}`}</Text>
      </View>
    );
  };

  const renderMonth = (monthIndex) => {
    const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthIndex, 1);
    const monthKey = `${monthDate.getFullYear()}-${(monthDate.getMonth() + 1).toString().padStart(2, '0')}-01`;

    return (
      <View key={monthKey} style={[{ marginBottom: 0 }, {backgroundColor: '#131514'}]}>
        <Calendar
          current={monthKey}
          hideExtraDays
          markedDates={{ [currentDay]: { selected: 'blue' } }}
          hideArrows
          hideDayNames
          style={{backgroundColor: '#131514'}}
          renderHeader={(date) => renderHeader(date)}
          theme ={ {
            backgroundColor: '#131514',
            calendarBackground: '#131514',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: 'white',
            dayTextColor: '#527792',
            textDisabledColor: '#d9e', // Color de fondo de los días en el componente Calendar
            monthTextColor: 'white',
          }}
          onDayPress={day => {
            console.log('selected day', day);
          }}
        />
      </View>
    );
  };

  const renderedMonths = [];
  for (let i = 0; i < monthsToShow; i++) {
    renderedMonths.push(renderMonth(i));
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      {renderedMonths}
    </ScrollView>
  );
};

export default CustomCalendar;
