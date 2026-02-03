import { createBrowserRouter } from 'react-router-dom'
import GeneralError from '@/pages/errors/general-error'
import NotFoundError from '@/pages/errors/not-found-error'
import MaintenanceError from '@/pages/errors/maintenance-error'
import UnauthorisedError from '@/pages/errors/unauthorised-error.tsx'

const router = createBrowserRouter([
    // Auth routes
    // {
    //     path: '/sign-in',
    //     lazy: async () => ({
    //         Component: (await import('@/pages/auth/sign-in')).default,
    //     }),
    // },
    // {
    //     path: '/sign-in-2',
    //     lazy: async () => ({
    //         Component: (await import('@/pages/auth/sign-in-2')).default,
    //     }),
    // },
    // {
    //     path: '/sign-up',
    //     lazy: async () => ({
    //         Component: (await import('@/pages/auth/sign-up')).default,
    //     }),
    // },
    // {
    //     path: '/forgot-password',
    //     lazy: async () => ({
    //         Component: (await import('@/pages/auth/forgot-password')).default,
    //     }),
    // },
    // {
    //     path: '/otp',
    //     lazy: async () => ({
    //         Component: (await import('@/pages/auth/otp')).default,
    //     }),
    // },

    // Main routes
    {
        path: '/',
        lazy: async () => {
            const AppShell = await import('@/App')
            return { Component: AppShell.default }
        },
        errorElement: <GeneralError />,
        children: [
            {
                index: true,
                lazy: async () => ({
                    Component: (await import('@/pages/dashboard/Dashboard')).default,
                }),
            },
            {
                path: 'score-eshel',
                lazy: async () => ({
                    Component: (await import('@/pages/score-eshel/ScoreEshel')).default,
                }),
            },
            {
                path: 'score-eshel/edit/:id',
                lazy: async () => ({
                    Component: (await import('@/pages/score-eshel/EditScoreEshel')).default,
                }),
            },
            {
                path: 'prize-shelf',
                lazy: async () => ({
                    Component: (await import('@/pages/prize-shelf/PrizeShelf')).default,
                }),
            },
            {
                path: 'prize-shelf/new',
                lazy: async () => ({
                    Component: (await import('@/pages/prize-shelf/AddPrizeShelf')).default,
                }),
            },
            {
                path: 'prize-shelf/edit/:id',
                lazy: async () => ({
                    Component: (await import('@/pages/prize-shelf/EditPrizeShelf')).default,
                }),
            },
            {
                path: 'sms-management',
                lazy: async () => ({
                    Component: (await import('@/pages/sms-management/SMSReport')).default,
                }),
            },
            {
                path: 'expenses',
                lazy: async () => ({
                    Component: (await import('@/pages/sms-management/Expenses')).default,
                }),
            },
            {
                path: 'buy-sms',
                lazy: async () => ({
                    Component: (await import('@/pages/sms-management/BuySMS')).default,
                }),
            },
            {
                path: 'sms-template',
                lazy: async () => ({
                    Component: (await import('@/pages/sms-management/SMSTemplate')).default,
                }),
            },
            {
                path: 'discount-code',
                lazy: async () => ({
                    Component: (await import('@/pages/discount-code/DiscountCode')).default,
                }),
            },
            {
                path: 'forget-scenario',
                lazy: async () => ({
                    Component: (await import('@/pages/forget-scenario/ForgetScenario')).default,
                }),
            },
            {
                path: 'forget-scenario/edit',
                lazy: async () => ({
                    Component: (await import('@/pages/forget-scenario/EditForgetScenario')).default,
                }),
            },
            {
                path: 'customer-level',
                lazy: async () => ({
                    Component: (await import('@/pages/customer-management/CustomerLevels')).default,
                }),
            },
            {
                path: 'customers',
                lazy: async () => ({
                    Component: (await import('@/pages/customer-management/Customers')).default,
                }),
            },
            {
                path: 'customer-shopping-list',
                lazy: async () => ({
                    Component: (await import('@/pages/customer-management/CustomerShoppingList')).default,
                }),
            },
            {
                path: 'lucky-wheel',
                lazy: async () => ({
                    Component: (await import('@/pages/lucky-wheel/LuckyWheel')).default,
                }),
            },
            {
                path: 'sales-campaign',
                lazy: async () => ({
                    Component: (await import('@/pages/sales-campaign/SalesCampaign')).default,
                }),
            },
            {
                path: 'sales-campaign/new',
                lazy: async () => ({
                    Component: (await import('@/pages/sales-campaign/AddSalesCampaign')).default,
                }),
            },
            {
                path: 'poll',
                lazy: async () => ({
                    Component: (await import('@/pages/poll/Polls')).default,
                }),
            },
            {
                path: 'setting/banner',
                lazy: async () => ({
                    Component: (await import('@/pages/setting/Banners')).default,
                }),
            },
            {
                path: 'setting/setting',
                lazy: async () => ({
                    Component: (await import('@/pages/setting/Setting')).default,
                }),
            },
            {
                path: 'account/profile',
                lazy: async () => ({
                    Component: (await import('@/pages/account/Profile')).default,
                }),
            },
        ],
    },
    // Error routes
    // { path: '/500', Component: GeneralError },
    { path: '/404', Component: NotFoundError },
    { path: '/503', Component: MaintenanceError },
    { path: '/401', Component: UnauthorisedError },

    // Fallback 404 route
    { path: '*', Component: NotFoundError },
])

export default router
