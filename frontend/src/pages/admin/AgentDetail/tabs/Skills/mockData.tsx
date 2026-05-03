import React from 'react';
import { 
  IconReceipt, 
  IconDollar, 
  IconCube, 
  IconLocation, 
  IconDatabase, 
  IconChat, 
  IconUsers, 
  IconTicket 
} from '../../../../../components/common/Icons';

export interface SkillTemplate {
  id: string;
  name: string;
  category: string;
  categoryColor: 'orange' | 'red' | 'blue' | 'green' | 'purple';
  description: string;
  icon: React.ReactNode;
}

export const mockTemplates: SkillTemplate[] = [
  {
    id: 'create_lead',
    name: 'create_lead',
    category: 'Lead',
    categoryColor: 'blue',
    description: 'Tạo lead mới trong CRM khi khách hàng thể hiện quan tâm dịch vụ',
    icon: <IconDatabase />
  },
  {
    id: 'update_contact',
    name: 'update_contact',
    category: 'Contact',
    categoryColor: 'green',
    description: 'Cập nhật thông tin liên hệ (SĐT, email, địa chỉ) cho khách hàng hiện có',
    icon: <IconUsers />
  },
  {
    id: 'create_ticket',
    name: 'create_ticket',
    category: 'Ticket',
    categoryColor: 'purple',
    description: 'Tạo ticket support khi AI không giải quyết được và cần escalade',
    icon: <IconTicket />
  },
  {
    id: 'get_order_status',
    name: 'get_order_status',
    category: 'Đơn hàng',
    categoryColor: 'orange',
    description: 'Kiểm tra trạng thái đơn hàng, lịch sử mua hàng của khách',
    icon: <IconReceipt />
  },
  {
    id: 'create_deal',
    name: 'create_deal',
    category: 'Deal',
    categoryColor: 'red',
    description: 'Tạo deal/opportunity trong pipeline khi khách quan tâm gói dịch vụ cao cấp',
    icon: <IconDollar />
  },
  {
    id: 'search_products',
    name: 'search_products',
    category: 'Sản phẩm',
    categoryColor: 'blue',
    description: 'Tìm kiếm sản phẩm/dịch vụ theo tên, danh mục, khu vực',
    icon: <IconCube />
  },
  {
    id: 'find_branch',
    name: 'find_branch',
    category: 'Chi nhánh',
    categoryColor: 'orange',
    description: 'Tìm chi nhánh/cửa hàng gần nhất theo địa chỉ khách hàng',
    icon: <IconLocation />
  },
  {
    id: 'create_order',
    name: 'create_order',
    category: 'Đơn hàng',
    categoryColor: 'orange',
    description: 'Chốt đơn trực tiếp trong chat: lấy thông tin, báo giá, tạo đơn và đẩy sang vận chuyển',
    icon: <IconReceipt />
  }
];

// EOF
