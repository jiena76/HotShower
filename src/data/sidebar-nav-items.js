export default function () {
  return [{
    title: 'Dashboards',
    items: [{
      title: 'Analytics',
      to: '/analytics',
      htmlBefore: '<i class="material-icons">&#xE917;</i>',
      htmlAfter: '',
    }, {
      title: 'Online Store',
      to: '/ecommerce',
      htmlBefore: '<i class="material-icons">&#xE8D1;</i>',
      htmlAfter: '',
    }, {
      title: 'Personal Blog',
      to: '/blog-overview',
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: '',
    }],
  },
  {
    title: 'Templates',
    items: [{
      title: 'User Account',
      htmlBefore: '<i class="material-icons">&#xE7FD;</i>',
      open: false,
      items: [{
        title: 'User Profile',
        to: '/user-profile',
      }, {
        title: 'User Profile Lite',
        to: '/user-profile-lite',
      }, {
        title: 'Edit User Profile',
        to: '/edit-user-profile',
      }, {
        title: 'Login',
        to: '/login',
      }, {
        title: 'Register',
        to: '/register',
      }, {
        title: 'Change Password',
        to: '/change-password',
      }, {
        title: 'Forgot Password',
        to: '/forgot-password',
      },
      ],
    }, {
      title: 'File Managers',
      htmlBefore: '<i class="material-icons">&#xE2C7;</i>',
      open: false,
      items: [{
        title: 'Files - List View',
        to: '/file-manager-list',
      }, {
        title: 'Files - Cards View',
        to: '/file-manager-cards',
      }],
    }, {
      title: 'Transaction History',
      htmlBefore: '<i class="material-icons">&#xE889;</i>',
      to: '/transaction-history',
    }, {
      title: 'Calendar',
      htmlBefore: '<i class="material-icons">calendar_today</i>',
      to: '/calendar',
    }, {
      title: 'Add New Post',
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: '/add-new-post',
    }, {
      title: 'Errors',
      htmlBefore: '<i class="material-icons">error</i>',
      to: '/errors',
    }],
  }, {
    title: 'Components',
    items: [{
      title: 'Overview',
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: '/components-overview',
    }, {
      title: 'Tables',
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: '/tables',
    }, {
      title: 'Blog Posts',
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: '/blog-posts',
    }],
  }, {
    title: 'Layouts',
    items: [{
      title: 'Header Nav',
      htmlBefore: '<i class="material-icons">view_day</i>',
      to: '/header-navigation',
    }, {
      title: 'Icon Sidebar',
      htmlBefore: '<i class="material-icons">&#xE251;</i>',
      to: '/icon-sidebar-nav',
    }],
  },
  ];
}
