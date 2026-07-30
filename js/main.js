const chatWidget = document.getElementById('chatWidget');
const chatToggle = document.getElementById('chatToggle');
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

function addMessage(text, sender) {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}`;
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
  const wrapper = document.createElement('div');
  wrapper.className = 'chat-bubble bot typing';
  wrapper.innerHTML = '<span></span><span></span><span></span>';
  chatMessages.appendChild(wrapper);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return wrapper;
}

function getResponse(message) {
  const query = message.toLowerCase();

  if (/hello|hi|who are you|about you|intro/.test(query)) {
    return "I’m Brandon’s website assistant. I can share details about his education, work experience, projects, and skills.";
  }

  if (/education|school|college|university|ccsu|degree|gpa/.test(query)) {
    return "Brandon is pursuing a B.S. in Computer Science with a Cybersecurity concentration at Central Connecticut State University, expected December 2026. He has been on the Dean’s List and has a GPA of 3.7.";
  }

  if (/work|experience|intern|job|the hartford|co-op/.test(query)) {
    return "He has experience as a Tech & Operations Intern at The Hartford and as a Co-op Intern in IT Desktop Engineering at CCSU.";
  }

  if (/project|projects|catalog|machine learning|automation|security/.test(query)) {
    return "His projects include an internal developer tool for repository cataloging, a network intrusion detection project using machine learning, and endpoint security automation work.";
  }

  if (/skill|skills|tech|technology|python|java|powerShell|azure|aws|github|agile|ci\/cd/.test(query)) {
    return "His technical skills include Python, Java, Bash, PowerShell, AWS DynamoDB, Microsoft Azure, Entra ID, Intune, Git, GitHub, CI/CD, and Agile/Scrum practices.";
  }

  if (/contact|email|resume|pdf|download/.test(query)) {
    return "You can download his résumé from the button above, or reach him at brandonprice918@yahoo.com.";
  }

  if (/thank/.test(query)) {
    return "You’re welcome — happy to help.";
  }

  return "I can help with Brandon’s education, work experience, projects, skills, and résumé. Try asking something like ‘What projects have you worked on?’";
}

function toggleChat(open) {
  chatWidget.classList.toggle('open', open);
  chatToggle.setAttribute('aria-expanded', String(open));

  if (open) {
    chatInput.focus();
    if (chatMessages.children.length === 0) {
      addMessage('Hi! Ask me about Brandon’s background, projects, or experience.', 'bot');
    }
  }
}

chatToggle.addEventListener('click', () => {
  const isOpen = chatWidget.classList.contains('open');
  toggleChat(!isOpen);
});

document.querySelectorAll('.suggestion-chip').forEach((button) => {
  button.addEventListener('click', () => {
    chatInput.value = button.dataset.question;
    toggleChat(true);
    chatForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });
});

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = chatInput.value.trim();

  if (!value) {
    return;
  }

  addMessage(value, 'user');
  chatInput.value = '';

  const typingIndicator = showTypingIndicator();

  window.setTimeout(() => {
    typingIndicator.remove();
    addMessage(getResponse(value), 'bot');
  }, 650);
});

window.addEventListener('DOMContentLoaded', () => {
  toggleChat(false);
});
