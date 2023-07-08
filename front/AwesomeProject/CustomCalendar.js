import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
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

const CustomCalendar = ({maxMonthsToRender}) => {
  const currentDate = new Date();
  const currentDay = currentDate.toISOString().split('T')[0];
  const currentMonth = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-01`;

  const monthsToShow = maxMonthsToRender; // Número de meses a mostrar

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
    <View style={styles.container}>
    <View style={styles.logoContainer}>
          <Image
            source={require('./assets/logo.png')} // Ruta de tu imagen del logo
            resizeMode="contain" // Ajusta la imagen al tamaño del contenedor manteniendo la proporción
            style={styles.logo}
          />
    </View>
    <View style={styles.dayNamesContainer}>
      <Text style={styles.dayName}>dom</Text>
      <Text style={styles.dayName}>lun</Text>
      <Text style={styles.dayName}>mar</Text>
      <Text style={styles.dayName}>mié</Text>
      <Text style={styles.dayName}>jue</Text>
      <Text style={styles.dayName}>vie</Text>
      <Text style={styles.dayName}>sáb</Text>
    </View>
    <ScrollView style={{ flex: 1 }}>
      {renderedMonths}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#131514',
  },
  dayNamesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  dayName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#131514',
  },
  logo:{
    width: '70%',
  },
});

export default CustomCalendar;
