import { Mail, Phone, Calendar, Shield, User } from "lucide-react";

const ProfilePage = () => {
    return (
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-8 text-center">
            <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full flex items-center justify-center">
              <User className="text-gray-500 w-12 h-12" />
            </div>
            <h2 className="text-white text-2xl font-bold mt-4">John Doe</h2>
            <p className="text-gray-200 flex items-center justify-center gap-2 mt-2">
              <Shield className="w-5 h-5" /> Admin
            </p>
          </div>
          <div className="p-6 grid grid-cols-2 gap-6 text-gray-700">
            <div className="flex items-center gap-2">
              <Mail className="text-purple-600 w-5 h-5" />
              <div>
                <p className="text-sm font-semibold">Email</p>
                <p className="text-gray-600">john.doe@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="text-purple-600 w-5 h-5" />
              <div>
                <p className="text-sm font-semibold">Phone</p>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="text-purple-600 w-5 h-5" />
              <div>
                <p className="text-sm font-semibold">Join Date</p>
                <p className="text-gray-600">1/15/2023</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="text-purple-600 w-5 h-5" />
              <div>
                <p className="text-sm font-semibold">Access Level</p>
                <p className="text-gray-600">Full Access</p>
              </div>
            </div>
          </div>
        </div>
      );
};

export default ProfilePage;
