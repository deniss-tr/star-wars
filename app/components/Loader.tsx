
import Image from 'next/image';

const Loader = () => {
  return (
    <div className="flex justify-center">
      <Image src="/loading.gif" alt="loading" width="200" height="200"/>
    </div>
  );
};

export default Loader;