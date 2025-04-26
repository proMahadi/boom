import React from "react";

const Skeleton = () => {
  return (
    <div className="w-full p-4 rounded-lg space-y-3">
      {/* Row 1 - Pure white #FFFFFF */}
      <div className="flex gap-2 w-full">
        <Skeleton className="h-4 w-[70%] rounded-md" />
        <Skeleton className="h-4 w-[25%] rounded-md" />
      </div>

      {/* Row 2 - Medium green-gray #6B817E */}
      <div className="flex gap-2 w-full opacity-70">
        <Skeleton className="h-4 w-[45%] rounded-md" />
        <Skeleton className="h-4 w-[50%] rounded-md" />
      </div>

      {/* Row 3 - Medium green-gray #6B817E */}
      <div className="flex gap-2 w-full opacity-70">
        <Skeleton className="h-4 w-[20%] rounded-md" />
        <Skeleton className="h-4 w-[50%] rounded-md" />
      </div>

      {/* Row 4 - Dark green #274641 */}
      <div className="flex gap-2 w-full opacity-15">
        <Skeleton className="h-4 w-[45%] rounded-md" />
        <Skeleton className="h-4 w-[50%] rounded-md" />
      </div>

      {/* Row 5 - Dark green #274641 */}
      <div className="w-full opacity-15">
        <Skeleton className="h-4 w-[55%] rounded-md" />
      </div>
    </div>
  );
};

export default Skeleton;
