// Authentication credentials
const ADMIN_EMAIL = 'jsvdbeukel@gmail.com';
const ADMIN_PASSWORD = 'Berlioz21!';

// Check if user is already logged in
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('dashboard.html') && !isLoggedIn) {
        window.location.href = 'login.html';
    }
}

// Login form handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');
            
            if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userEmail', email);
                
                // Show success and redirect
                errorMessage.textContent = 'Login successful! Redirecting...';
                errorMessage.classList.remove('error');
                errorMessage.classList.add('show', 'success');
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                errorMessage.textContent = 'Invalid email or password';
                errorMessage.classList.add('show', 'error');
                
                // Shake animation
                loginForm.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    loginForm.style.animation = '';
                }, 500);
            }
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('userEmail');
            window.location.href = 'login.html';
        });
    }
    
    // Check authentication on page load
    checkAuth();
});

// Add shake animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
