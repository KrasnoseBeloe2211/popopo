import { apiController } from '@/shared/config/api/api';

// export const getReport = async () => {
//   return await apiController<{
//     metrics: Record<string, number>;
//     summary: string;
//   }>('GET', '/report');
// };
export const getReport = async () => {
  return {
    succes: true,
    data: {
      metrics: {
        Logic: 80,
        Creativity: 70,
        Communication: 60,
        Technical: 50,
        Management: 90
      },
      summary: "Вы показали высокий уровень креативности и управления."
    }
  };
};