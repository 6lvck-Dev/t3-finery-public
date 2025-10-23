// admin.js - Admin Dashboard Functionality

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const sidebar = document.querySelector('.admin-sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const adminMain = document.querySelector('.admin-main');
    const adminHeader = document.querySelector('.admin-header');
    const adminContent = document.querySelector('.admin-content');
    const quickAddBtn = document.querySelector('.quick-add-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const logoutBtn = document.querySelector('.logout-btn');
    const viewAllBtn = document.querySelector('.view-all-btn');
    const actionCards = document.querySelectorAll('.action-card');
    const navItems = document.querySelectorAll('.nav-item');
    const notificationBtn = document.querySelector('.notification-btn');
    const searchBtn = document.querySelector('.search-btn');

    // Initialize dashboard
    initDashboard();

    // Sidebar toggle functionality
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('active');
            adminMain.classList.toggle('sidebar-active');
            adminHeader.classList.toggle('sidebar-active');
            adminContent.classList.toggle('sidebar-active');
        });
    }

    // Quick Add Modal functionality
    if (quickAddBtn) {
        quickAddBtn.addEventListener('click', function () {
            openModal();
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Navigation functionality
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }

            // Remove active class from all items
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });

            // Add active class to clicked item
            this.classList.add('active');

            // Update page title based on clicked nav item
            updatePageTitle(this);

            // Load appropriate content
            loadSectionContent(this.dataset.section);

            // Close sidebar on mobile after selection
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Action cards functionality
    actionCards.forEach(card => {
        card.addEventListener('click', function () {
            const action = this.dataset.action;
            handleQuickAction(action);
        });
    });

    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            showLoading('Logging out...');
            setTimeout(() => {
                // Redirect to login page or handle logout
                window.location.href = '/login';
            }, 1500);
        });
    }

    // View all activities
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function () {
            loadAllActivities();
        });
    }

    // Notification functionality
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function () {
            toggleNotifications();
        });
    }

    // Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', function () {
            toggleSearch();
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            toggleSearch();
        }

        // Escape to close modals
        if (e.key === 'Escape') {
            closeModal();
        }

        // Ctrl/Cmd + N for new item
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            openModal();
        }
    });

    // Initialize charts and stats
    initializeCharts();

    // Simulate real-time updates
    startRealTimeUpdates();

    // Functions
    function initDashboard() {
        console.log('Admin Dashboard initialized');

        // Set initial active nav item
        const initialActive = document.querySelector('.nav-item.active') || document.querySelector('.nav-item');
        if (initialActive) {
            updatePageTitle(initialActive);
            loadSectionContent(initialActive.dataset.section);
        }

        // Load initial stats
        updateDashboardStats();
    }

    function openModal() {
        if (modalOverlay) {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function updatePageTitle(navItem) {
        const pageTitle = document.querySelector('.page-title');
        if (pageTitle && navItem) {
            const itemText = navItem.querySelector('.nav-text')?.textContent || navItem.textContent;
            pageTitle.textContent = itemText;
        }
    }

    function loadSectionContent(section) {
        if (!section) return;

        showLoading(`Loading ${section}...`);

        // Simulate API call delay
        setTimeout(() => {
            hideLoading();

            switch (section) {
                case 'dashboard':
                    loadDashboardContent();
                    break;
                case 'users':
                    loadUsersContent();
                    break;
                case 'products':
                    loadProductsContent();
                    break;
                case 'orders':
                    loadOrdersContent();
                    break;
                case 'analytics':
                    loadAnalyticsContent();
                    break;
                case 'settings':
                    loadSettingsContent();
                    break;
                default:
                    loadDashboardContent();
            }
        }, 800);
    }

    function loadDashboardContent() {
        // Update stats in real-time
        updateDashboardStats();

        // Load recent activities
        loadRecentActivities();

        console.log('Dashboard content loaded');
    }

    function loadUsersContent() {
        adminContent.innerHTML = `
            <div class="content-header">
                <h2 class="section-title">User Management</h2>
                <button class="btn-primary" onclick="openModal()">Add User</button>
            </div>
            <div class="content-body">
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>John Doe</td>
                                <td>john@example.com</td>
                                <td>Admin</td>
                                <td><span class="status-badge active">Active</span></td>
                                <td>
                                    <button class="btn-sm btn-edit">Edit</button>
                                    <button class="btn-sm btn-delete">Delete</button>
                                </td>
                            </tr>
                            <!-- More rows would be dynamically generated -->
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    function loadProductsContent() {
        adminContent.innerHTML = `
            <div class="content-header">
                <h2 class="section-title">Product Management</h2>
                <button class="btn-primary" onclick="openModal()">Add Product</button>
            </div>
            <div class="content-body">
                <div class="products-grid">
                    <!-- Product cards would be dynamically generated -->
                    <div class="product-card">
                        <div class="product-image">📱</div>
                        <div class="product-info">
                            <h3>Smartphone X</h3>
                            <p class="product-price">$999</p>
                            <p class="product-stock">In Stock: 45</p>
                        </div>
                        <div class="product-actions">
                            <button class="btn-sm btn-edit">Edit</button>
                            <button class="btn-sm btn-delete">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function loadOrdersContent() {
        adminContent.innerHTML = `
            <div class="content-header">
                <h2 class="section-title">Order Management</h2>
            </div>
            <div class="content-body">
                <div class="orders-stats">
                    <div class="stat-card">
                        <div class="stat-icon">📦</div>
                        <div class="stat-info">
                            <div class="stat-value">156</div>
                            <div class="stat-label">Total Orders</div>
                        </div>
                    </div>
                    <!-- More order stats -->
                </div>
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#ORD-001</td>
                                <td>John Doe</td>
                                <td>$199.99</td>
                                <td><span class="status-badge completed">Completed</span></td>
                                <td>2024-01-15</td>
                                <td>
                                    <button class="btn-sm btn-view">View</button>
                                    <button class="btn-sm btn-edit">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    function loadAnalyticsContent() {
        adminContent.innerHTML = `
            <div class="content-header">
                <h2 class="section-title">Analytics</h2>
            </div>
            <div class="content-body">
                <div class="charts-grid">
                    <div class="chart-container">
                        <canvas id="revenueChart"></canvas>
                    </div>
                    <div class="chart-container">
                        <canvas id="trafficChart"></canvas>
                    </div>
                </div>
            </div>
        `;

        // Initialize charts
        initializeCharts();
    }

    function loadSettingsContent() {
        adminContent.innerHTML = `
            <div class="content-header">
                <h2 class="section-title">Settings</h2>
            </div>
            <div class="content-body">
                <div class="settings-tabs">
                    <div class="tab-nav">
                        <button class="tab-btn active" data-tab="general">General</button>
                        <button class="tab-btn" data-tab="security">Security</button>
                        <button class="tab-btn" data-tab="notifications">Notifications</button>
                    </div>
                    <div class="tab-content">
                        <div class="tab-pane active" id="general">
                            <form class="settings-form">
                                <div class="form-group">
                                    <label>Site Name</label>
                                    <input type="text" value="My Admin Dashboard" class="form-input">
                                </div>
                                <div class="form-group">
                                    <label>Timezone</label>
                                    <select class="form-select">
                                        <option>UTC-5 (Eastern Time)</option>
                                    </select>
                                </div>
                                <button type="submit" class="btn-primary">Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function handleQuickAction(action) {
        showLoading(`Processing ${action}...`);

        setTimeout(() => {
            hideLoading();

            switch (action) {
                case 'add-user':
                    openModal();
                    break;
                case 'add-product':
                    openModal();
                    break;
                case 'view-reports':
                    loadSectionContent('analytics');
                    break;
                case 'manage-orders':
                    loadSectionContent('orders');
                    break;
                default:
                    console.log(`Action: ${action}`);
            }

            // Show success notification
            showNotification(`${action.replace('-', ' ')} action completed successfully!`, 'success');
        }, 1000);
    }

    function updateDashboardStats() {
        // Simulate API call to update stats
        const stats = [
            { selector: '.stat-card:nth-child(1) .stat-value', value: '1,234' },
            { selector: '.stat-card:nth-child(2) .stat-value', value: '$45,678' },
            { selector: '.stat-card:nth-child(3) .stat-value', value: '89' },
            { selector: '.stat-card:nth-child(4) .stat-value', value: '156' }
        ];

        stats.forEach(stat => {
            const element = document.querySelector(stat.selector);
            if (element) {
                // Add counting animation
                animateValue(element, 0, parseInt(stat.value.replace(',', '')), 1000);
            }
        });
    }

    function loadRecentActivities() {
        // This would typically come from an API
        const activities = [
            { icon: '👤', title: 'New User Registered', desc: 'John Doe signed up', time: '2 min ago' },
            { icon: '📦', title: 'Order Completed', desc: 'Order #ORD-001 was delivered', time: '1 hour ago' },
            { icon: '💰', title: 'Payment Received', desc: '$199.99 from Jane Smith', time: '3 hours ago' },
            { icon: '🛒', title: 'New Product Added', desc: 'Smartphone X added to catalog', time: '5 hours ago' }
        ];

        const activityList = document.querySelector('.activity-list');
        if (activityList) {
            activityList.innerHTML = activities.map(activity => `
                <div class="activity-item">
                    <div class="activity-icon">${activity.icon}</div>
                    <div class="activity-content">
                        <div class="activity-title">${activity.title}</div>
                        <div class="activity-desc">${activity.desc}</div>
                        <div class="activity-time">${activity.time}</div>
                    </div>
                </div>
            `).join('');
        }
    }

    function loadAllActivities() {
        showLoading('Loading all activities...');

        setTimeout(() => {
            hideLoading();
            // In a real app, this would load a paginated list of all activities
            showNotification('All activities loaded successfully!', 'success');
        }, 1500);
    }

    function toggleNotifications() {
        showNotification('Notifications panel would open here', 'info');
    }

    function toggleSearch() {
        showNotification('Search panel would open here', 'info');
    }

    function initializeCharts() {
        // This would initialize Chart.js or similar library
        console.log('Charts initialized');
    }

    function startRealTimeUpdates() {
        // Simulate real-time updates
        setInterval(() => {
            // Update online status
            const statusIndicator = document.querySelector('.status-indicator');
            if (statusIndicator) {
                statusIndicator.style.animation = 'none';
                setTimeout(() => {
                    statusIndicator.style.animation = 'pulse 2s infinite';
                }, 10);
            }

            // Randomly update a stat (for demo purposes)
            const randomStat = document.querySelector(`.stat-card:nth-child(${Math.floor(Math.random() * 4) + 1}) .stat-value`);
            if (randomStat) {
                const current = parseInt(randomStat.textContent.replace(',', ''));
                const change = Math.floor(Math.random() * 10) + 1;
                animateValue(randomStat, current, current + change, 500);
            }
        }, 10000); // Update every 10 seconds
    }

    // Utility Functions
    function showLoading(message = 'Loading...') {
        let loadingOverlay = document.querySelector('.loading-overlay');
        if (!loadingOverlay) {
            loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay';
            loadingOverlay.innerHTML = `
                <div class="loading-content">
                    <div class="loading-spinner"></div>
                    <div class="loading-text">${message}</div>
                </div>
            `;
            document.body.appendChild(loadingOverlay);
        }
        loadingOverlay.classList.add('active');
    }

    function hideLoading() {
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.remove('active');
            setTimeout(() => {
                if (loadingOverlay.parentNode) {
                    loadingOverlay.parentNode.removeChild(loadingOverlay);
                }
            }, 300);
        }
    }

    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${getNotificationIcon(type)}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Add styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--bg-card);
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-lg);
                    padding: var(--space-md);
                    box-shadow: var(--shadow-lg);
                    z-index: 4000;
                    animation: slideInRight 0.3s ease-out;
                    max-width: 400px;
                }
                .notification-success { border-left: 4px solid #4CAF50; }
                .notification-error { border-left: 4px solid #ff4444; }
                .notification-warning { border-left: 4px solid #ff9800; }
                .notification-info { border-left: 4px solid var(--primary-gold); }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: var(--space-sm);
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: var(--text-secondary);
                    cursor: pointer;
                    font-size: 1.2rem;
                    margin-left: auto;
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideInRight 0.3s ease-out reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);

        // Close on click
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    function getNotificationIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || 'ℹ️';
    }

    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Make functions globally available for HTML onclick handlers
    window.openModal = openModal;
    window.closeModal = closeModal;
});
