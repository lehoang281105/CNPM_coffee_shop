# React Frontend Blueprint (Feature-first, multi-role)

Mục tiêu: nhanh để code, clean, dễ mở rộng; ưu tiên theo feature/module nhưng vẫn tách layout + routes + shared UI rõ ràng.

---

## 1) Folder structure (tree)

frontend/
  src/
    app/
      providers/
        AppProviders.tsx
        AuthProvider.tsx
      config/
        env.ts
        roles.ts
        permissions.ts
      bootstrap/
        initApp.ts

    assets/
      images/
      styles/

    components/                      # Shared UI (không chứa logic nghiệp vụ)
      data-display/
        DataTable/
        Pagination/
        EmptyState/
      feedback/
        Modal/
        Drawer/
        ConfirmDialog/
        Toast/
        Loading/
      forms/
        FormField/
        FormSection/
      navigation/
        Sidebar/
        Topbar/
        Breadcrumbs/
        Tabs/

    layouts/                         # App shells theo ngữ cảnh/role
      AuthLayout/
      AppShell/
      AdminShell/
      BusinessShell/
      StaffShell/
      UserShell/

    routes/                          # React Router config + guards
      router.tsx
      routePaths.ts
      guards/
        RequireAuth.tsx
        RequireRole.tsx
        RequirePermission.tsx
      navigation/
        buildNavByRole.ts

    features/                        # Domain modules (mỗi module tự đóng gói)
      auth/
        pages/
          LoginPage/
          ForgotPasswordPage/
        components/
          LoginForm/
        services/
          auth.api.ts
        hooks/
          useLogin.ts
        store/
          auth.slice.ts
        types/
          auth.types.ts

      dashboard/
        pages/
          DashboardPage/
        components/
          KpiGrid/
          KpiCard/
          DashboardCharts/
          RecentConversationsTable/
        services/
          dashboard.api.ts
        hooks/
          useDashboard.ts
        types/
          dashboard.types.ts

      bots/
        pages/
          BotListPage/
          BotDetailPage/
        components/
          BotFiltersBar/
          BotTable/
          BotUpsertModal/
          BotForm/
          BotTabs/
        services/
          bots.api.ts
        hooks/
          useBots.ts
        types/
          bots.types.ts

      chat-monitor/
        pages/
          ChatMonitorPage/
        components/
          ConversationListPanel/
          ConversationFiltersBar/
          ConversationDetailPanel/
          MessageTimeline/
          MessageBubble/
          MessageComposer/
          AssignStaffModal/
        services/
          chat.api.ts
          chat.ws.ts
        hooks/
          useChatMonitor.ts
          useChatStream.ts
        types/
          chat.types.ts

      knowledge/
        pages/
          KnowledgePage/             # Tabs: Documents | FAQ | Intents
        documents/
          components/
            DocumentUploadModal/
            DocumentsTable/
            DocumentPreviewDrawer/
          services/
            documents.api.ts
          types/
            documents.types.ts
        faq/
          components/
            FAQTable/
            FAQUpsertModal/
            FAQForm/
          services/
            faq.api.ts
          types/
            faq.types.ts
        intents/
          components/
            IntentTable/
            IntentUpsertPage/
            IntentForm/
            TrainingPhrasesEditor/
          services/
            intents.api.ts
          types/
            intents.types.ts

      user-management/
        pages/
          UserManagementPage/
        components/
          UserFiltersBar/
          UsersTable/
          UserUpsertModal/
          UserForm/
          RoleBadge/
        services/
          users.api.ts
        hooks/
          useUsers.ts
        types/
          users.types.ts

      profile/
        pages/
          ProfilePage/
        services/
          profile.api.ts

    pages/                            # (Optional) Route-level wrappers theo role
      admin/
      business/
      staff/
      customer/                       # Có thể đổi tên thành user/ nếu bạn muốn

    services/                         # HTTP client + cross-feature services
      http/
        httpClient.ts                 # fetch/axios wrapper + interceptors
        errorMapper.ts
      storage/
        tokenStorage.ts

    store/                            # Global state (nếu dùng Redux Toolkit)
      index.ts
      slices/
        ui.slice.ts
      selectors/

    hooks/                            # Shared hooks (không thuộc feature cụ thể)
      useDebounce.ts
      useDisclosure.ts

    utils/
      format.ts
      date.ts

    types/
      api.types.ts
      common.types.ts

Gợi ý quan trọng để scale:
- components/ chỉ chứa UI thuần dùng lại nhiều nơi.
- Mọi thứ có logic nghiệp vụ đặt trong features/<module>/...
- routes/ chỉ cấu hình route + guard; tránh để API call trong routes.

---

## 2) Routing (liệt kê route + role)

Quy ước:
- Public: không cần đăng nhập
- App: RequireAuth
- Guard theo role: RequireRole([ADMIN|BUSINESS|STAFF|USER])
- Một số màn hình dùng chung nhưng quyền đọc/ghi khác nhau → xử lý bằng RequirePermission hoặc permission flags trong UI.

### Public
- / → redirect theo trạng thái đăng nhập
- /auth/login
- /auth/forgot-password
- /auth/reset-password
- /unauthorized
- /404

### Shared (RequireAuth, dùng chung mọi role)
- /app/profile

### Admin (RequireRole: ADMIN)
- /app/admin/dashboard
- /app/admin/bots
- /app/admin/bots/:botId
- /app/admin/chat-monitor
- /app/admin/knowledge/documents
- /app/admin/knowledge/faq
- /app/admin/knowledge/intents
- /app/admin/users
- /app/admin/businesses
- /app/admin/audit-logs
- /app/admin/settings

### Business (RequireRole: BUSINESS)
- /app/dashboard
- /app/bots
- /app/bots/:botId
- /app/bots/:botId/settings
- /app/chat-monitor
- /app/knowledge/documents
- /app/knowledge/faq
- /app/knowledge/intents
- /app/staff
- /app/settings

### Staff (RequireRole: STAFF)
- /app/chat-monitor
- /app/chat-monitor/:conversationId
- /app/knowledge/documents            (thường read-only)
- /app/knowledge/faq                  (thường read-only)
- /app/knowledge/intents              (thường read-only)

### End User portal (RequireRole: USER)  (tùy bạn có làm portal hay không)
- /portal
- /portal/chat/:botId
- /portal/conversations
- /portal/conversations/:conversationId
- /portal/profile

### Route dùng chung giữa các role (highlight)
- Profile: /app/profile (ADMIN|BUSINESS|STAFF|USER)
- Chat Monitor: /app/chat-monitor (BUSINESS|STAFF, ADMIN nếu muốn giám sát)
- Knowledge: /app/knowledge/* (ADMIN|BUSINESS full, STAFF read-only)
- Dashboard: /app/dashboard (BUSINESS, có thể STAFF nếu cần)

---

## 3) Component tree (màn hình chính)

Ký hiệu:
- AppShell*: layout có Sidebar + Topbar + Content container
- Reusable UI: DataTable, Modal, Drawer, Tabs, FilterBar, FormField...

### A) Dashboard
DashboardPage
  AppShell (BusinessShell hoặc AdminShell)
    Sidebar
    Topbar
    Content
      PageHeader
        Title
        DateRangePicker
        QuickActions
      KpiGrid
        KpiCard x N
      DashboardCharts
        ConversationsVolumeChart
        ResponseTimeChart
      RecentConversationsTable (DataTable)
        TableToolbar (SearchInput, Filters)
        TableBody
        Pagination
      SystemHealthWidget
        BotHealthList
        KnowledgeIndexStatus

### B) Bot Management
BotListPage
  AppShell (BusinessShell hoặc AdminShell)
    PageHeader
      Title
      CreateBotButton
    BotFiltersBar
      SearchInput
      StatusSelect
      ChannelSelect
    BotTable (DataTable)
      BotNameCell
      StatusBadge
      ChannelBadges
      ActionsMenu (View, Edit, Delete)
    Pagination
    BotUpsertModal (Modal)
      BotForm
        BasicInfoSection
        ChannelConfigSection
        HandoffRulesSection
        SubmitBar
    ConfirmDeleteBotDialog

BotDetailPage
  AppShell
    PageHeader
      Breadcrumbs
      BotStatusBadge
      Actions (Train, Deploy)
    BotTabs (Tabs)
      OverviewTab
        BotSummaryCards
        BotPerformanceChart
      SettingsTab
        BotSettingsForm
      IntegrationsTab
        IntegrationList
        IntegrationConfigModal

### C) Chat Monitor
ChatMonitorPage
  AppShell (StaffShell hoặc BusinessShell)
    PageHeader
      FiltersSummary
      AssignToMeButton
      RefreshStatus
    SplitPaneLayout
      LeftPanel: ConversationListPanel
        ConversationFiltersBar
          SearchInput
          StatusSelect
          BotSelect
          AssigneeSelect
        ConversationList
          ConversationListItem x N
        Pagination / InfiniteScroll

      RightPanel: ConversationDetailPanel
        ConversationHeader
          CustomerSummary
          StatusBadge
          AssigneeBadge
          Actions (Assign, Close)
        MessageTimeline
          MessageBubble x N
            MessageMeta (time, sender, intent)
        MessageComposer
          Textarea
          QuickReplies
          Attachments
          SendButton
        AssignStaffModal (Modal)
        CloseConversationDialog (ConfirmDialog)

### D) Documents / FAQ / Intent
KnowledgePage
  AppShell (BusinessShell hoặc AdminShell; StaffShell read-only)
    PageHeader
      Title
      PrimaryActions (Upload, Add FAQ, Create Intent)
    KnowledgeTabs (Tabs)

      DocumentsTab
        DocumentToolbar
          SearchInput
          StatusFilter
          UploadButton
        DocumentUploadModal (Modal)
        DocumentsTable (DataTable)
          FileNameCell
          IngestionStatusBadge
          ActionsMenu (Preview, Reindex, Delete)
        DocumentPreviewDrawer (Drawer)

      FAQTab
        FAQToolbar
          SearchInput
          CategoryFilter
          AddFAQButton
        FAQTable (DataTable)
        FAQUpsertModal (Modal)
          FAQForm
            QuestionField
            AnswerEditor
            TagsInput

      IntentsTab
        IntentToolbar
          SearchInput
          StatusFilter
          CreateIntentButton
        IntentTable (DataTable)
        IntentUpsertPage (hoặc Modal)
          IntentForm
            IntentName
            TrainingPhrasesEditor
            ResponsesEditor
            EntitiesSlotEditor
          IntentTestPanel

### E) User Management
UserManagementPage
  AppShell (AdminShell hoặc BusinessShell)
    PageHeader
      Title
      InviteUserButton
    UserManagementTabs (Tabs)

      AdminUsersTab (ADMIN)
        UserFiltersBar
          SearchInput
          RoleSelect
          StatusSelect
          TenantSelect
        UsersTable (DataTable)
          NameEmailCell
          RoleBadge
          StatusBadge
          ActionsMenu (Edit, Disable, ResetPassword)
        UserUpsertModal (Modal)
          UserForm
            BasicInfoSection
            RoleSelect
            PermissionScopes
        ConfirmDisableDialog

      StaffTab (BUSINESS)
        StaffTable (DataTable)
        InviteStaffModal
        AssignBotAccessDrawer

      EndUsersTab (tuỳ chọn)
        EndUsersTable (DataTable)
        ConversationHistoryDrawer
