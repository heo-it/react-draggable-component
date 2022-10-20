import React, {
  CSSProperties,
  FunctionComponent,
  MouseEvent as r_MouseEvent,
  MutableRefObject,
  ReactNode,
  useRef,
  useState
} from 'react';
import { useEffect } from 'react';

interface PositionType {
  x: number,
  y: number
}

const Draggable: FunctionComponent<{ children: ReactNode }> = function ({
  children,
}) {
  const [pos, setPos] = useState<PositionType>({x: 0, y: 0});
  const [dragging, setDragging] = useState<boolean>(false);
  const [rel, setRel] = useState<PositionType>({x: 0, y: 0});
  const draggableRef = useRef<HTMLDivElement>();

  useEffect(() => {
    function onMouseMove (e: MouseEvent) {
      if (!dragging) return;
      setPos((prevPos) => {
        return {
          ...prevPos,
          x: e.pageX - rel.x,
          y: e.pageY - rel.y
        }
      });
      e.stopPropagation();
      e.preventDefault();
    };

    if (dragging) {
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    } else {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [dragging, pos, rel]);

  const onMouseDown = (e: r_MouseEvent) => {
    if (e.button !== 0) return;
    setDragging(true);
    if (draggableRef.current) {
      const left = draggableRef.current?.offsetLeft;
      const top = draggableRef.current?.offsetTop;
      setRel((prevPos) => {
        return {
          ...prevPos,
          x: e.pageX - left,
          y: e.pageY - top
        }
      });
    }
    e.stopPropagation();
    e.preventDefault();
  }

  const onMouseUp = (e: MouseEvent) => {
    setDragging(false);
    e.stopPropagation();
    e.preventDefault();
  }

  const positionStyle: CSSProperties = { left: pos.x + 'px', top: pos.y + 'px' };
  const style: CSSProperties = { position: 'absolute', cursor: 'pointer' };

  return (
    <div
      ref = { draggableRef as MutableRefObject<HTMLDivElement> }
      style={{...style, ...positionStyle}}
      onMouseDown={onMouseDown}>
       { children }
    </div>
  );
}

export default Draggable;
