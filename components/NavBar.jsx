import Link from 'next/link';

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Get Design', href: '/get-design' },
];

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Name */}
          <div className="text-xl font-bold hover:text-gray-400">
            <Link href="/">
              Design Decode
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  {item.name}
                
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex flex-col space-y-2 px-4 py-2">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
