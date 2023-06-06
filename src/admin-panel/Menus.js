const Menus = [
    {
        title: "Dashboard",
        src: "dashborad",
        link: 'admin-categories',
    },
    {
        title: "Orders",
        src: "dashborad",
        link: 'orders',
    },
    {
        title: "Products",
        src: "dashborad",
        link: 'all-products',
        subMenus: [
            {
                title: 'All Product list',
                src: '',
                link: 'all-products'
            },
            {
                title: 'Review Product List',
                src: 'sub',
                link: 'review-product'
            },
            {
                title: 'Approve Product List',
                src: 'child',
                link: 'approve-product'
            },
            {
                title: 'Product Settings',
                src: 'child',
                link: 'approve-product'
            }
        ],
        isOpen: false, // Add isOpen property
    },
    {
        title: "Categories",
        src: "Categories",
        link: 'admin-parent',
        subMenus: [
            {
                title: 'Parent Categories',
                src: 'parent',
                link: 'admin-parent'
            },
            {
                title: 'Sub Categories',
                src: 'sub',
                link: 'admin-subCategories'
            },
            {
                title: 'Child Categories',
                src: 'child',
                link: 'child-categories'
            },
            {
                title: 'Attribute',
                src: 'child',
                link: 'addattributes'
            }
        ],
        isOpen: false, // Add isOpen property
    },
    {
        title: "Seller",
        src: "Categories",
        link: 'approve-seller',
        subMenus: [
            {
                title: 'Seller List',
                src: 'parent',
                link: 'approve-seller'
            },
            {
                title: 'Seller Verification',
                src: 'sub',
                link: 'seller-verification'
            },

        ],
        isOpen: false, // Add isOpen property
    },
    {
        title: "Set Coupons",
        src: "dashborad",
        link: 'coupons',
    },
    {
        title: "Blog",
        src: "dashborad",
        link: '',
        subMenus: [
            {
                title: 'Categories',
                src: 'parent',
                link: ''
            },
            {
                title: 'Post',
                src: 'sub',
                link: ''
            },
            {
                title: 'Blog Settings',
                src: 'sub',
                link: ''
            },

        ],
        isOpen: false, // Add isOpen property
    },
    {
        title: "General Settings",
        src: "dashborad",
        link: 'dashboard',
        subMenus: [
            {
                title: 'Logo',
                src: 'parent',
                link: ''
            },
            {
                title: 'Fevicon',
                src: 'sub',
                link: ''
            },
            {
                title: 'Loader',
                src: 'sub',
                link: ''
            },
            {
                title: 'Pop-up Banner',
                src: 'sub',
                link: ''
            },
            {
                title: 'Error Banner',
                src: 'sub',
                link: ''
            },
            {
                title: 'Webisite Maintanance',
                src: 'sub',
                link: ''
            },

        ],
        isOpen: false, // Add isOpen property
    },
    {
        title: "Email Settings",
        src: "dashborad",
        link: '',
        subMenus: [
            {
                title: 'Email Template',
                src: 'parent',
                link: ''
            },
            {
                title: 'Email Configuration',
                src: 'sub',
                link: ''
            },
            {
                title: 'Group Email',
                src: 'sub',
                link: ''
            },

        ],
        isOpen: false, // Add isOpen property
    },
    {
        title: "Social Settings",
        src: "dashborad",
        link: '',
        subMenus: [
            {
                title: 'Social Links',
                src: 'parent',
                link: ''
            },
            {
                title: 'Facebook Login',
                src: 'sub',
                link: ''
            },
            {
                title: 'Google login',
                src: 'sub',
                link: ''
            },

        ],
        isOpen: false, // Add isOpen property
    },
    {
        title: "Manage User",
        src: "dashborad",
        link: '',
        subMenus: [
            {
                title: 'Manage Staff',
                src: 'parent',
                link: ''
            },
            {
                title: 'Manage Roles',
                src: 'sub',
                link: ''
            }
        ],
        isOpen: false, // Add isOpen property
    },
    {
        title: "Homepage Settings",
        src: "dashborad",
        link: '',
        subMenus: [
            {
                title: 'Templates',
                src: 'parent',
                link: ''
            },
            {
                title: 'Sections',
                src: 'sub',
                link: ''
            }
        ],
        isOpen: false, // Add isOpen property
    },


];
export default Menus;
