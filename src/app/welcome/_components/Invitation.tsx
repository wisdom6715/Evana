import React, { useState } from 'react';
import useCompany from '@/services/fetchComapnyData';
import { useRouter } from 'next/navigation';

interface InvitationProps {
  onClose: () => void;
}

const Invitation: React.FC<InvitationProps> = ({ onClose }) => {
  const [companyId, setCompanyId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const { company } = useCompany({
    companyId,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!company) {
        throw new Error('Company not found');
      }

      if (companyId === company.company_id) {
        // Store company ID in localStorage or session if needed
        localStorage.setItem('companyId', companyId);
        router.push('/dashboard/home');
      } else {
        setError('Invalid company ID. Please check and try again.');
      }
    } catch (error: any) {
      setError(`Unable to verify company ID. Please try again.  ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="w-[90%] md:w-[35%] max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-center text-2xl font-bold">
            Welcome to IntuitionLabs
          </h2>
        </div>
        
        <div className="space-y-6">
          <p className="text-center text-gray-600">
            Please share your company ID if you were invited here
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={companyId}
              onChange={(e) => {
                setCompanyId(e.target.value);
                setError('');
              }}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company ID"
              disabled={isLoading}
              required
            />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div className="flex justify-center gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800 
                         disabled:bg-gray-400 disabled:cursor-not-allowed
                         transition-colors duration-200"
              >
                {isLoading ? 'Verifying...' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-5 py-2 border border-black text-black rounded-md
                         hover:bg-gray-100 disabled:opacity-50 
                         disabled:cursor-not-allowed transition-colors duration-200"
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