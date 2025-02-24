import cls from './EditorPage.module.scss';
import { Editor } from '@/widgets/editor';

export const EditorPage = () => {
  return (
    <div className={cls.EditorPage}>
      <Editor />
    </div>
  );
};
