// Hamburger menu functionality
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");

hamburger.addEventListener("click", () => {
  sidebar.classList.add("active");
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

// Close sidebar when clicking a link
sidebar.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down
    header.style.transform = "translateY(-100%)";
  } else {
    // Scrolling up
    header.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop;
});

// Form submission
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Simple validation
  if (!name || !email || !message) {
    alert("Please fill in all required fields.");
    return;
  }

  // Simulate form submission
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  setTimeout(() => {
    alert("Thank you for your message! I'll get back to you soon.");
    this.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

// Character counter for message textarea
const messageTextarea = document.getElementById("message");
const maxLength = 1000;

// Create character counter element
const charCounter = document.createElement("span");
charCounter.id = "charCount";
charCounter.style.cssText =
  "font-size: 0.9em; color: #64748b; display: block; text-align: right; margin-top: 0.5rem;";
messageTextarea.parentNode.appendChild(charCounter);

function updateCharCounter() {
  const remaining = maxLength - messageTextarea.value.length;
  charCounter.textContent = `${remaining} characters remaining`;

  if (remaining < 50) {
    charCounter.style.color = "#ef4444";
  } else if (remaining < 100) {
    charCounter.style.color = "#f59e0b";
  } else {
    charCounter.style.color = "#64748b";
  }
}

messageTextarea.addEventListener("input", updateCharCounter);
messageTextarea.setAttribute("maxlength", maxLength);
updateCharCounter(); // Initialize counter

// Add typing animation to welcome text
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const welcomeText = document.querySelector(".welcome p");
  if (welcomeText) {
    const originalText = welcomeText.textContent;
    setTimeout(() => {
      typeWriter(welcomeText, originalText, 30);
    }, 1000);
  }
});

// Add parallax effect to welcome section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const welcome = document.querySelector(".welcome");
  if (welcome) {
    const rate = scrolled * -0.5;
    welcome.style.transform = `translateY(${rate}px)`;
  }
});

// Add hover effects to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add click to copy email functionality
const emailElement = document.querySelector('footer a[href^="mailto:"]');
if (emailElement) {
  emailElement.addEventListener("click", function (e) {
    e.preventDefault();
    const email = this.textContent;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        // Create temporary notification
        const notification = document.createElement("div");
        notification.textContent = "Email copied to clipboard!";
        notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #10b981;
                color: white;
                padding: 1rem;
                border-radius: 8px;
                z-index: 9999;
                animation: slideIn 0.3s ease;
            `;

        document.body.appendChild(notification);

        setTimeout(() => {
          notification.remove();
        }, 3000);
      });
    } else {
      // Fallback for older browsers
      window.location.href = `mailto:${email}`;
    }
  });
}
