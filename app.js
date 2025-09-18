
        function addSubject() {
            const container = document.getElementById('subjectsContainer');
            const newRow = document.createElement('div');
            newRow.className = 'subject-row';
            newRow.innerHTML = `
                <input type="text" placeholder="Subject Name" class="subject-name">
                <select class="subject-grade">
                    <option value="10">O (10)</option>
                    <option value="9">A+ (9)</option>
                    <option value="8">A (8)</option>
                    <option value="7">B+ (7)</option>
                    <option value="6">B (6)</option>
                    <option value="5">C (5)</option>
                    <option value="0">F (0)</option>
                </select>
                <input type="number" placeholder="Credits" class="subject-credit" min="1" value="1">
                <button class="remove-btn" onclick="removeSubject(this)">×</button>
            `;
            container.appendChild(newRow);
        }
        
        function removeSubject(button) {
            const container = document.getElementById('subjectsContainer');
            if (container.children.length > 1) {
                button.parentElement.remove();
            } else {
                alert("You need at least one subject!");
            }
        }
        
        function calculateSGPA() {
            const rows = document.querySelectorAll('.subject-row');
            let totalCredits = 0;
            let totalGradePoints = 0;
            
            // Validate inputs
            let isValid = true;
            rows.forEach(row => {
                const creditInput = row.querySelector('.subject-credit');
                const nameInput = row.querySelector('.subject-name');
                
                if (!nameInput.value.trim()) {
                    isValid = false;
                    nameInput.style.borderColor = 'red';
                } else {
                    nameInput.style.borderColor = '#ddd';
                }
                
                if (!creditInput.value || parseInt(creditInput.value) <= 0) {
                    isValid = false;
                    creditInput.style.borderColor = 'red';
                } else {
                    creditInput.style.borderColor = '#ddd';
                }
            });
            
            if (!isValid) {
                alert('Please fill all subject names and enter valid credits (greater than 0)');
                return;
            }
            
            // Calculate SGPA
            rows.forEach(row => {
                const grade = parseFloat(row.querySelector('.subject-grade').value);
                const credits = parseFloat(row.querySelector('.subject-credit').value);
                
                totalGradePoints += grade * credits;
                totalCredits += credits;
            });
            
            const sgpa = totalGradePoints / totalCredits;
            displayResult(sgpa);
        }
        
        function displayResult(sgpa) {
            const resultDiv = document.getElementById('result');
            const sgpaValue = document.getElementById('sgpaValue');
            const congratsMsg = document.getElementById('congratsMsg');
            const goodJobMsg = document.getElementById('goodJobMsg');
            
            // Display result
            resultDiv.style.display = 'block';
            sgpaValue.textContent = sgpa.toFixed(2);
            
            // Hide previous messages
            congratsMsg.style.display = 'none';
            goodJobMsg.style.display = 'none';
            
            // message
            if (sgpa >= 9) {
                congratsMsg.style.display = 'block';
            } else if (sgpa >= 8) {
                goodJobMsg.style.display = 'block';
            }
            
            // Scroll to result
            resultDiv.scrollIntoView({ behavior: 'smooth' });
        }
