import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { allUsers, deleteUser } from "../../api/User";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaUserShield,
  FaUser,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function Users() {
  const queryClient = useQueryClient();

  // Fetch all users
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["allUsers"],
    queryFn: allUsers,
    staleTime: 1000 * 60, // 1 minute
    cacheTime: 1000 * 60 * 5, // keep in cache for 5 min
    refetchOnWindowFocus: false, // don’t refetch every tab switch
  });

  // Delete mutation
  const { mutate: deleteUserMutate, isPending: isDeleting } = useMutation({
    mutationFn: (email) => deleteUser(email),
    onSuccess: () => {
      toast.success("User deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
    onError: () => {
      toast.error("Failed to delete user. Please try again.");
    },
  });

  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    let timeout;
    if (isLoading || isFetching) {
      setShowSkeleton(true);
    } else {
      timeout = setTimeout(() => setShowSkeleton(false), 1000);
    }
    return () => clearTimeout(timeout);
  }, [isLoading, isFetching]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [verifiedFilter, setVerifiedFilter] = useState("all");
  const [page, setPage] = useState(1);
  const usersPerPage = 8;

  const filteredUsers = useMemo(() => {
    if (!data) return [];
    return data.filter((user) => {
      const matchesSearch = user.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesRole =
        roleFilter === "all" ? true : user.role === roleFilter;
      const matchesVerified =
        verifiedFilter === "all"
          ? true
          : verifiedFilter === "true"
          ? user.isVerified
          : !user.isVerified;
      return matchesSearch && matchesRole && matchesVerified;
    });
  }, [data, search, roleFilter, verifiedFilter]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (isError) return <div className="p-6">Error loading users</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border px-3 py-2 rounded-md dark:bg-gray-800 dark:border-gray-600"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded-md dark:bg-gray-800 dark:border-gray-600"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <select
          value={verifiedFilter}
          onChange={(e) => {
            setVerifiedFilter(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded-md dark:bg-gray-800 dark:border-gray-600"
        >
          <option value="all">All</option>
          <option value="true">Verified</option>
          <option value="false">Not Verified</option>
        </select>
      </div>

      {showSkeleton ? (
        <div>
          <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow rounded-lg">
            <table className="min-w-full border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Image</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Verified</th>
                  <th className="px-4 py-2 text-left">Joined</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(8)].map((_, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 dark:border-gray-700 animate-pulse"
                  >
                    <td className="px-4 py-2">
                      <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 w-30 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 w-67 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 w-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow rounded-lg">
          <table className="min-w-full border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Verified</th>
                <th className="px-4 py-2 text-left">Joined</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="px-4 py-2">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 flex items-center gap-1">
                    {user.role === "admin" ? (
                      <FaUserShield className="text-blue-500" />
                    ) : (
                      <FaUser className="text-gray-500" />
                    )}
                    {user.role}
                  </td>
                  <td className="px-4 py-2">
                    {user.isVerified ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deleteUserMutate(user.email)}
                      className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-200 cursor-pointer"
                      disabled={isDeleting}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Table */}

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {filteredUsers.length} users found
        </span>
        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
          >
            Prev
          </button>
          <span className="text-sm text-gray-800 dark:text-gray-200">
            Page {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
            className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
