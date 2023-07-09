"use strict"


document.addEventListener('DOMContentLoaded', function () {
	const form = document.querySelector('#form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		if (error === 0) {
			const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');

			if (response.ok) {
				form.reset();
				form.querySelector('.success').classList.remove('hidden');

				delay(2000)
					.then(() => {
						form.querySelector('.success').classList.add('hidden');
					})
					.then(() => {
						form
							.querySelectorAll('.form-header, .fields-list, .signup-block__btn')
							.forEach(el => el.classList.add('hidden'));
					})
					.then(()=> {
						form.querySelector('.thank').classList.remove('hidden')
					})
			}
		}
	}

	function formValidate(form) {
		let error = 0;
		let formRequired = form.querySelectorAll('.required');

		for (let i = 0; i < formRequired.length; i++) {
			const input = formRequired[i];

			if (input.id !== 'email') {
				input.addEventListener('focus', () => formRemoveError(input));
			}

			formRemoveError(input);

			if (input.id === 'password') {
				if (passwordTest(password)) {
					formAddError(input);
					formAddError(password);
					error++;
				}
			}

			if (input.id === 'confirm_password') {
				const password = Array.from(formRequired).find(el => el.id === 'password');
				const notification = document.querySelector('.password-match');

				if (input.value !== password.value) {
					notification.classList.remove('hidden');
					formAddError(input);
					error++;
				} else {
					notification.classList.add('hidden');
				}
			}

			if (input.classList.contains('email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			}

			if (input.value === '') {
				formAddError(input);
				error++;
			}
		}

		return error;
	}


	function formAddError(input) {
		input.classList.add('error');
	}

	function formRemoveError(input) {
		input.classList.remove('error');
	}

	function passwordTest(input) {
		return !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g.test(input.value);
	}

	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}


	const selectDay = document.querySelector('#day');
	const selectMonth = document.querySelector('#month');
	const selectYear = document.querySelector('#year');
	
	setOption(1970, new Date().getFullYear() + 1, selectYear);
	setOption(1, 32, selectDay);
	setMonth(selectMonth);
})


function setMonth(element) {
	const date = new Date();

	for (let i = 0; i < 12; i++) {
		const month = date.setMonth(i)
		const monthName = date.toLocaleString(month, { month: 'long' });

		element.append(createOption(i + 1, monthName));
	}
}

function setOption(start, end, element) {
	for (let i = start; i < end; i++) {
		element.append(createOption(i, i));
	}
}

function createOption(value, inner) {
	const option = document.createElement('option');
	option.value = value;
	option.innerHTML = inner;

	return option;
}

const delay = (timeout) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};
