import React from 'react';
import { IconChat, IconTicket, IconProduct, IconService, IconBranch } from '../../../../../components/common/Icons';

export const mockIntegrations = [
  { id: 'chat', title: ' Chat', subtext: 'Học từ lịch sử hội thoại trên các kênh chat', count: 12847, checked: true, icon: <IconChat /> },
  { id: 'ticket', title: 'Ticket', subtext: 'Học từ ticket đã giải quyết của agent người', count: 3421, checked: true, icon: <IconTicket /> },
  { id: 'product', title: 'Sản phẩm', subtext: 'Học từ thông tin và tài liệu sản phẩm', count: 0, checked: false, icon: <IconProduct /> },
  { id: 'service', title: 'Dịch vụ', subtext: 'Học từ mô tả và quy trình dịch vụ', count: 0, checked: false, icon: <IconService /> },
  { id: 'branch', title: 'Chi nhánh', subtext: 'Học từ thông tin và chính sách chi nhánh', count: 0, checked: false, icon: <IconBranch /> },
];
