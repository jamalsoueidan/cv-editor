import { DraggableProvidedDraggableProps } from "@hello-pangea/dnd";
import cx from "clsx"; // Assuming you’re using `classnames` for conditional classes
import { forwardRef } from "react";
import classes from "./DraggableItem.module.css";

export const DraggableItem = forwardRef<
  HTMLDivElement,
  DraggableProvidedDraggableProps & { isDragging: boolean } & {
    children: React.ReactNode;
  }
>(({ isDragging, children, ...props }, ref) => (
  <div
    className={cx({
      [classes.itemDragging]: isDragging,
    })}
    ref={ref}
    {...props}
  >
    {children}
  </div>
));

DraggableItem.displayName = "DraggableItem";
