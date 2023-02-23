import { MutableRefObject } from "react";
import { useScreenshot, createFileName } from "use-react-screenshot";

export function useGetImage(ref: MutableRefObject<any>) {
  const [image, takeScreenShot] = useScreenshot();

  const download = (image: any, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const getImage = () => takeScreenShot(ref.current).then(download);

  return getImage;
}
