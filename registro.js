const form = document.getElementById('auth-form');
const title = document.getElementById('form-title');
const toggleText = document.getElementById('toggle-text');
const toggleForm = document.getElementById('toggle-form');
const messageElement = document.getElementById('message');
const confirmPasswordInput = document.getElementById('confirm-password');

let isRegistering = true;

toggleForm.addEventListener('click', () => {
    isRegistering = !isRegistering;
    title.textContent = isRegistering ? 'Registro' : 'Login';
    form.querySelector('button').textContent = isRegistering ? 'Registrar' : 'Entrar';
    confirmPasswordInput.style.display = isRegistering ? 'block' : 'none';
    document.getElementById('phone').style.display = isRegistering ? 'block' : 'none';
    document.getElementById('address').style.display = isRegistering ? 'block' : 'none';
    document.getElementById('zip').style.display = isRegistering ? 'block' : 'none';
    messageElement.classList.add('hidden');
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = confirmPasswordInput.value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const zip = document.getElementById('zip').value;

    messageElement.classList.remove('hidden');

    if (isRegistering) {
        if (password !== confirmPassword) {
            messageElement.textContent = 'As senhas não correspondem.';
            messageElement.className = 'error';
            return;
        }
        
        if (localStorage.getItem(username)) {
            messageElement.textContent = 'Nome de usuário já está em uso.';
            messageElement.className = 'error';
            return;
        }

        // Armazenar dados do usuário como um objeto JSON
        const userData = {
            password,
            phone,
            address,
            zip,
        };
        localStorage.setItem(username, JSON.stringify(userData));
        messageElement.textContent = 'Registro bem-sucedido! Você pode fazer login agora.';
        messageElement.className = 'success';
    } else {
        const storedData = JSON.parse(localStorage.getItem(username));
        if (storedData && storedData.password === password) {
            messageElement.textContent = 'Login bem-sucedido! Bem-vindo(a)!';
            messageElement.className = 'success';
        } else {
            messageElement.textContent = 'Nome de usuário ou senha incorretos.';
            messageElement.className = 'error';
        }
    }

    form.reset();
});
