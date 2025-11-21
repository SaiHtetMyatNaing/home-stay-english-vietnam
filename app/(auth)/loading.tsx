// components/loading.tsx or app/loading.tsx
import { Spinner } from '@/components/ui/spinner';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-xs z-50">
      <Spinner />
    </div>
  );
};

export default Loading;