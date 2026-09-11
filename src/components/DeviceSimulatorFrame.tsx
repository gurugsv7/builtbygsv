import React from 'react';

interface DeviceSimulatorFrameProps {
  children: React.ReactNode;
}

export const DeviceSimulatorFrame: React.FC<DeviceSimulatorFrameProps> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#131921] font-sans antialiased selection:bg-[#0F8B75] selection:text-white flex flex-col items-center w-full">
      {/* Web App Responsive Container */}
      <div className="w-full min-h-screen bg-[#F8F9FA] flex flex-col justify-between relative">
        {children}
      </div>
    </div>
  );
};

