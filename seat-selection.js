// Declare selectedSeats globally
const selectedSeats = [];

document.addEventListener('DOMContentLoaded', function() {
    const leftSeatGrid = document.getElementById('left-seat-grid');
    const middleSeatGrid = document.getElementById('middle-seat-grid');
    const rightSeatGrid = document.getElementById('right-seat-grid');
    const seatList = document.getElementById('seat-list');
    const messageContainer = document.getElementById('message-container');
    const maxSeats = 6;

    function createSeatGrid(container, symbol) {
        for (let i = 1; i <= 9; i++) {
            for (let j = 1; j <= 8; j++) {
                const seat = document.createElement('div');
                seat.classList.add('seat');
        
                // Calculate the seat number based on the position
                const seatNumber = (i - 1) * 8 + j;
                seat.textContent = seatNumber + symbol; // Add the symbol
        
                seat.addEventListener('click', () => onSeatClick(seat, symbol)); // Pass the symbol
                container.appendChild(seat);
        
                // Log seat numbers to the console
                console.log('Seat created:', seatNumber + symbol);
            }
        }
    }
    
    createSeatGrid(leftSeatGrid, 'A');
    createSeatGrid(middleSeatGrid, 'B');
    createSeatGrid(rightSeatGrid, 'C');
    
    

    function onSeatClick(seat, symbol) {
        const seatNumber = parseInt(seat.textContent);
        const seatWithSymbol = seatNumber + symbol;
    
        if (selectedSeats.length >= maxSeats) {
            alert('You can only select up to 6 seats.');
            return;  // Stop further execution
        }
    
        if (!selectedSeats.includes(seatWithSymbol)) {
            selectedSeats.push(seatWithSymbol);
            seat.classList.add('selected-seat'); // Add the selected class
            updateSeatList();
        } else {
            selectedSeats = selectedSeats.filter(num => num !== seatWithSymbol);
            seat.classList.remove('selected-seat'); // Remove the selected class
            updateSeatList();
        }
    }
    
    
    
    

    function updateSeatList() {
        seatList.innerHTML = '';
        selectedSeats.forEach(seatNumber => {
            const listItem = document.createElement('li');
            listItem.textContent = `Seat ${seatNumber}: `;
            const inputName = document.createElement('input');
            inputName.type = 'text';
            inputName.placeholder = 'Enter name';
            listItem.appendChild(document.createElement('br'));
            listItem.appendChild(inputName);
            seatList.appendChild(listItem);
        });
    }

    function showMessage(message, success = true) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', success ? 'success' : 'error');
        messageDiv.textContent = message;
        messageContainer.appendChild(messageDiv);

        // Remove the message after a short delay (e.g., 3 seconds)
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    // Now, the onclick attribute should correctly reference the globally defined function
    const confirmButton = document.getElementById('confirm-button');
    confirmButton.onclick = confirmBooking;

    // Define the confirmBooking function outside the DOMContentLoaded event listener
    function confirmBooking() {
        if (selectedSeats.length > 0) {
            // Map each selected seat to include the correct symbol
            const seatsMessage = `Seats confirmed: ${selectedSeats.map(seat => seat).join(', ')}`;
            
            const names = [];
            seatList.querySelectorAll('input').forEach(input => {
                names.push(input.value || 'N/A');
            });
            const namesMessage = `Names: ${names.join(', ')}`;
        
            // Display separate messages for seats and names
            showMessage(seatsMessage, true);
            showMessage(namesMessage, true);
            selectedSeats = [];
            updateSeatList();
            // Additional logic for handling the confirmation, such as sending data to the server
        } else {
            showMessage('Please select at least one seat.', false);
        }
    }
    
    
        
    
});
