import React from 'react';

interface InvitationProps {
  onClose: () => void;
}

const Invitation: React.FC<InvitationProps> = ({ onClose }) => {
  return (
    <div className='w-[100%] absolute left-0 right-0 h-[100vh] flex items-center justify-center bg-neutral-300 bg-opacity-10'>
      <div className='px-3 py-3 bg-white h-[30%] flex items-center flex-col justify-center shadow'>
        <h1>Welcome to IntuitionLabs</h1>
        <div className='flex flex-col gap-10'>
          <p>Please share your company ID if you were invited here</p>
          <form action="" className='flex flex-col items-center gap-5'>
            <input type="text" className='w-[80%] bg-gray-200 h-[2rem] outline-none pl-2' placeholder='Enter company id'/>
            <div className='flex flex-row items-center justify-center gap-3'>
              <button type="submit" className='bg-black text-white px-5 py-1'>Submit</button>
              <button
                type="button"
                className='border border-black text-black px-5 py-1'
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Invitation;