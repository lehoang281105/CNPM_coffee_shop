import { useState, useEffect, useCallback } from 'react';
import { getSkills, createSkill, deleteSkill } from '../../services/admin/skillService';
import type { SkillBaseResponse } from '../../types';
import { SkillTemplate } from '../../pages/admin/AgentDetail/tabs/Skills/mockData';

export const useSkills = (botId?: string, brandId?: string) => {
  const [customSkills, setCustomSkills] = useState<SkillBaseResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activatingTemplateId, setActivatingTemplateId] = useState<string | null>(null);

  const fetchSkills = useCallback(async (isBackground = false) => {
    if (!botId) {
      setCustomSkills([]);
      setLoading(false);
      return;
    }

    try {
      if (!isBackground) {
        setLoading(true);
      }
      setError(null);
      const res = await getSkills({ bot_id: botId });
      setCustomSkills(res.data || []);
    } catch (err) {
      console.error('Error fetching skills:', err);
      setError('Không thể tải danh sách Skill. Vui lòng kiểm tra kết nối.');
      if (!isBackground) {
        setCustomSkills([]);
      }
    } finally {
      if (!isBackground) {
        setLoading(false);
      }
    }
  }, [botId]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const activateTemplate = async (template: SkillTemplate) => {
    try {
      setActivatingTemplateId(template.id);
      await createSkill({
        name: template.name,
        description: template.description,
        endpoint: "",
        method: "POST",
        parameters: {},
        fixed_parameters: {},
        headers: {},
        is_active: true,
        brand_id: brandId || ""
      });
      await fetchSkills(true);
    } catch (err) {
      console.error('Error activating template:', err);
      alert('Có lỗi xảy ra khi kích hoạt template.');
    } finally {
      setActivatingTemplateId(null);
    }
  };

  const deactivateTemplate = async (template: SkillTemplate) => {
    try {
      const skillToDeactivate = customSkills.find(skill => skill.name === template.name);
      if (skillToDeactivate) {
        setActivatingTemplateId(template.id);
        await deleteSkill(skillToDeactivate.id);
        await fetchSkills(true);
      }
    } catch (err) {
      console.error('Error deactivating template:', err);
      alert('Có lỗi xảy ra khi hủy kích hoạt template.');
    } finally {
      setActivatingTemplateId(null);
    }
  };

  const deleteCustomSkill = async (skillId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa Skill này không?')) {
      try {
        await deleteSkill(skillId);
        await fetchSkills(true);
      } catch (err) {
        console.error('Error deleting skill:', err);
        alert('Có lỗi xảy ra khi xóa Skill.');
      }
    }
  };

  return {
    customSkills,
    loading,
    error,
    refetch: () => fetchSkills(true),
    activatingTemplateId,
    activateTemplate,
    deactivateTemplate,
    deleteCustomSkill
  };
};
