document.addEventListener('DOMContentLoaded', function() {
    // Get today's date for the check-in default
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format dates for input fields
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Set min dates for inputs
    document.getElementById('check-in').min = formatDate(today);
    document.getElementById('check-out').min = formatDate(tomorrow);
    
    // Set default dates
    document.getElementById('check-in').value = formatDate(today);
    document.getElementById('check-out').value = formatDate(tomorrow);
    
    // Update summary when inputs change
    document.getElementById('bookingForm').addEventListener('change', updateSummary);
    
    // Room prices
    const roomPrices = {
        'urban-loft': 299,
        'sky-view': 499,
        'executive-pod': 199,
        'presidential': 1299,
        'biophilic': 349,
        'family': 599
    };
    
    function updateSummary() {
        const checkIn = document.getElementById('check-in').value;
        const checkOut = document.getElementById('check-out').value;
        const roomType = document.getElementById('room-type').value;
        const guests = document.getElementById('guests').value;
        
        // Update check-in/check-out display
        document.getElementById('summary-checkin').textContent = checkIn ? formatDisplayDate(checkIn) : 'Not selected';
        document.getElementById('summary-checkout').textContent = checkOut ? formatDisplayDate(checkOut) : 'Not selected';
        
        // Update room type display
        const roomSelect = document.getElementById('room-type');
        const selectedRoom = roomSelect.options[roomSelect.selectedIndex].text;
        document.getElementById('summary-room').textContent = roomType ? selectedRoom : 'Not selected';
        
        // Update guests
        document.getElementById('summary-guests').textContent = guests;
        
        // Calculate and update total if we have all required info
        if (checkIn && checkOut && roomType) {
            const nights = calculateNights(checkIn, checkOut);
            const pricePerNight = roomPrices[roomType];
            const total = nights * pricePerNight;
            
            document.getElementById('summary-total').textContent = `$${total}`;
        } else {
            document.getElementById('summary-total').textContent = '$0';
        }
    }
    
    function formatDisplayDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    
    function calculateNights(checkIn, checkOut) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diffTime = end - start;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    
    // Form submission
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const checkIn = document.getElementById('check-in').value;
        const checkOut = document.getElementById('check-out').value;
        const roomType = document.getElementById('room-type').value;
        const guests = document.getElementById('guests').value;
        const requests = document.getElementById('special-requests').value;
        
        if (!checkIn || !checkOut || !roomType) {
            alert('Please fill in all required fields');
            return;
        }
        
        // In a real app, you would send this data to your server
        console.log('Booking submitted:', {
            checkIn,
            checkOut,
            roomType,
            guests,
            requests
        });
        
        // Show confirmation (in a real app, you'd redirect to a payment page)
        alert('Your room is available! Redirecting to payment...');
        
        // Here you would typically redirect to a payment page
        // window.location.href = 'payment.html';
    });
    
    // Initialize summary
    updateSummary();
    
    // Update check-out min date when check-in changes
    document.getElementById('check-in').addEventListener('change', function() {
        const checkInDate = new Date(this.value);
        const nextDay = new Date(checkInDate);
        nextDay.setDate(nextDay.getDate() + 1);
        
        document.getElementById('check-out').min = formatDate(nextDay);
        
        // If current check-out is before new min date, update it
        const checkOutInput = document.getElementById('check-out');
        const checkOutDate = new Date(checkOutInput.value);
        
        if (checkOutDate <= checkInDate) {
            checkOutInput.value = formatDate(nextDay);
        }
        
        updateSummary();
    });
});