document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('dark-mode', isDark);
        themeToggle.innerHTML = isDark ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';
    });

    // Check for saved theme preference
    if (localStorage.getItem('dark-mode') === 'true') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Sidebar Toggle for Mobile
    const sidebarToggle = document.querySelector('.collapse-btn');
    const sidebar = document.querySelector('.sidebar');

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });

    // Navigation handling
    
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const contentSections = document.querySelectorAll('.dashboard, .products, .orders, .customers, .analytics, .settings');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Add active class to clicked link
            link.parentElement.classList.add('active');

            // Hide all content sections
            contentSections.forEach(section => section.classList.add('hidden'));

            // Show the corresponding section
            const targetSection = link.getAttribute('href').substring(1);
            const sectionId = targetSection + 'Content';
            const targetContent = document.getElementById(sectionId);
            
            // Show content and update title
            if (targetContent) {
                targetContent.classList.remove('hidden');
                
                // Special handling for settings section
                if (targetSection === 'settings') {
                    // Don't modify the title for settings
                    document.querySelector('.welcome-header h1').textContent = 'Settings';
                    document.querySelector('.welcome-header p').textContent = 'Manage your store settings';
                } else {
            const pageTitle = link.querySelector('span').textContent;
            document.querySelector('.welcome-header h1').textContent = `${pageTitle} Management`;
            document.querySelector('.welcome-header p').textContent = `Manage your ${targetSection.toLowerCase()}`;
                }
            }
        });
    });

    // Show dashboard by default
    const defaultSection = 'dashboard';
    document.getElementById(defaultSection + 'Content').classList.remove('hidden');
    document.querySelector(`[href="#${defaultSection}"]`).parentElement.classList.add('active');

    // Add Product Modal
    const addProductBtn = document.querySelector('.add-product-btn');
    const addProductModal = document.getElementById('addProductModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    const addProductForm = document.getElementById('addProductForm');

    // Open modal
    addProductBtn.addEventListener('click', () => {
        addProductModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal functions
    const closeModal = () => {
        addProductModal.classList.remove('active');
        document.body.style.overflow = '';
        addProductForm.reset();
        document.getElementById('imagePreview').innerHTML = '';
    };

    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    addProductModal.addEventListener('click', (e) => {
        if (e.target === addProductModal) {
            closeModal();
        }
    });

    // Image upload preview
    const productImages = document.getElementById('productImages');
    const imagePreview = document.getElementById('imagePreview');

    productImages.addEventListener('change', function(e) {
        imagePreview.innerHTML = '';
        const files = Array.from(e.target.files);

        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const previewItem = document.createElement('div');
                    previewItem.className = 'preview-item';
                    previewItem.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <button type="button" class="remove-image">×</button>
                    `;
                    imagePreview.appendChild(previewItem);

                    // Remove image functionality
                    previewItem.querySelector('.remove-image').addEventListener('click', function() {
                        previewItem.remove();
                    });
                };
                reader.readAsDataURL(file);
            }
        });
    });

    // Form submission
    addProductForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(this);
        
        // Add your API call here
        console.log('Submitting product data:', Object.fromEntries(formData));
        
        // Close modal after successful submission
        closeModal();
        
        // Optionally show success message
        // showNotification('Product added successfully', 'success');
    });

    // Orders functionality
    const orderViewButtons = document.querySelectorAll('.view-btn');
    const orderDetailsModal = document.getElementById('orderDetailsModal');
    const closeOrderDetailsBtn = orderDetailsModal?.querySelector('.close-modal');

    // Open order details modal
    orderViewButtons.forEach(button => {
        button.addEventListener('click', () => {
            orderDetailsModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close order details modal
    const closeOrderDetails = () => {
        orderDetailsModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeOrderDetailsBtn?.addEventListener('click', closeOrderDetails);

    // Close modal when clicking outside
    orderDetailsModal?.addEventListener('click', (e) => {
        if (e.target === orderDetailsModal) {
            closeOrderDetails();
        }
    });

    // Print order functionality
    const printOrderBtn = document.querySelector('.print-order-btn');
    printOrderBtn?.addEventListener('click', () => {
        window.print();
    });

    // Update order status functionality
    const updateStatusBtn = document.querySelector('.update-status-btn');
    updateStatusBtn?.addEventListener('click', () => {
        // Add your status update logic here
        console.log('Updating order status...');
    });

    // Customer Management
    const customerSearch = document.querySelector('.search-customers input');
    const statusFilter = document.querySelector('select[value=""]');
    const memberTypeFilter = document.querySelector('select[value=""]');
    const sortByFilter = document.querySelector('select[value=""]');
    
    // Search functionality
    customerSearch?.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const customerRows = document.querySelectorAll('.customers-table tbody tr');
        
        customerRows.forEach(row => {
            const customerName = row.querySelector('.customer-name').textContent.toLowerCase();
            const customerEmail = row.querySelector('.customer-contact span:first-child').textContent.toLowerCase();
            
            if (customerName.includes(searchTerm) || customerEmail.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Filter functionality
    const applyFilters = () => {
        const customerRows = document.querySelectorAll('.customers-table tbody tr');
        const selectedStatus = statusFilter?.value;
        const selectedMemberType = memberTypeFilter?.value;
        
        customerRows.forEach(row => {
            const status = row.querySelector('.status-badge').textContent.toLowerCase();
            const memberType = row.querySelector('.member-type').textContent.toLowerCase();
            
            const statusMatch = !selectedStatus || status === selectedStatus;
            const memberMatch = !selectedMemberType || memberType.includes(selectedMemberType);
            
            row.style.display = statusMatch && memberMatch ? '' : 'none';
        });
    };

    // Add event listeners to filters
    statusFilter?.addEventListener('change', applyFilters);
    memberTypeFilter?.addEventListener('change', applyFilters);
    sortByFilter?.addEventListener('change', applyFilters);

    // Block/Unblock customer
    const blockButtons = document.querySelectorAll('.block-btn');
    blockButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const statusBadge = row.querySelector('.status-badge');
            const isBlocked = statusBadge.classList.contains('customer-blocked');
            
            if (isBlocked) {
                statusBadge.classList.remove('customer-blocked');
                statusBadge.classList.add('customer-active');
                statusBadge.textContent = 'Active';
                this.title = 'Block';
            } else {
                statusBadge.classList.remove('customer-active');
                statusBadge.classList.add('customer-blocked');
                statusBadge.textContent = 'Blocked';
                this.title = 'Unblock';
            }
        });
    });

    // Edit customer
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const customerName = row.querySelector('.customer-name').textContent;
            console.log(`Editing customer: ${customerName}`);
            // Add your edit logic here
        });
    });

    // View customer details
    const viewButtons = document.querySelectorAll('.view-customer-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const customerName = row.querySelector('.customer-name').textContent;
            console.log(`Viewing customer details: ${customerName}`);
            // Add your view details logic here
        });
    });

    // Settings functionality
    const settingsTabs = document.querySelectorAll('.settings-tab');
    const settingsPanels = document.querySelectorAll('.settings-panel');

    settingsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and panels
            settingsTabs.forEach(t => t.classList.remove('active'));
            settingsPanels.forEach(p => p.classList.remove('active'));

            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            const panelId = tab.dataset.tab + 'Settings';
            document.getElementById(panelId)?.classList.add('active');
        });
    });

    // Handle form submissions
    const settingsForms = document.querySelectorAll('.settings-form');
    settingsForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your settings update logic here
            console.log('Saving settings...');
        });
    });

    // Profile image upload
    const uploadBtn = document.querySelector('.upload-btn');
    const removeBtn = document.querySelector('.remove-btn');
    const profileImg = document.querySelector('.profile-image-upload img');

    uploadBtn?.addEventListener('click', () => {
        // Add your image upload logic here
        console.log('Uploading new profile image...');
    });

    removeBtn?.addEventListener('click', () => {
        // Add your image remove logic here
        console.log('Removing profile image...');
    });
}); 