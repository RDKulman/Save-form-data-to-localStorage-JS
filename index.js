document.addEventListener('DOMContentLoaded', saveFormData);

function saveFormData() {
  const form = document.querySelector('.form'); // сохраняем форму в переменныую
  let data = {}; // объект, в который будут сохраняться данные из формы
  const ls = localStorage; // localStorage 

  // try catch для отлова ошибок
  try {
    form.addEventListener('input', event => {
      data[event.target.name] = event.target.value; // создаем в объекте ключ с именем поля формы и пишем туда значение из поля
      ls.setItem('formData', JSON.stringify(data)); // записываем в localStorage объект в формате JSON
    })
  
    // блок получения из localStorage данных обратно в поля
    // если есть поле, в которое сохранили объект с данными - вставляем данные из объекта в поля формы
    // иначе кидаемся ошибками
    if (ls.getItem('formData')) {
      data = JSON.parse(ls.getItem('formData'));
  
      for (let key in data) {
        if (form.elements[key].type === 'checkbox' && data[key] === 'on') {
          form.elements[key].checked = 'true';
        }
        else {
          form.elements[key].value = data[key];
        }
      }
    }
    else {
      throw new Error("Наташа, похоже у нас данные не туда сохраняются!");
    }
  }
  catch(error) {
    console.log(`Наташа, мы что-то сломали! Ошибка: ${error}`);
  }
}