const showFormattedDate = date => 
  new Intl.DateTimeFormat('id-ID', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  }).format(new Date(date));

export { showFormattedDate };
