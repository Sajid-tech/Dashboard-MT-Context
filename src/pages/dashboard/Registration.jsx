import { useContext, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPrint } from "react-icons/fa";
import Layout from "../../layout/Layout";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { ContextPanel } from "../../utils/ContextPanel";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";

const Registration = () => {
  const [registration, setRegistration] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        if (!isPanelUp) {
          naviagte("/maintenance");
          return;
        }

        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-register`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Check if the response has the expected structure
        if (response.data && response.data.registerData) {
          setRegistration(response.data.registerData);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
        // console.log(registerations);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      }
    };
    fetchRegistrations();
    setLoading(false);
  }, []);

  // search function
  const searchRegister = registration.filter((item) => {
    // item.fair_id.toString().includes(searchQuery)
    //  using OR logic for multiple search
    const query = searchQuery.toLowerCase();
    return (
      item.fair_id?.toString().toLowerCase().includes(query) ||
      item.fair_firm_name?.toLowerCase().includes(query) ||
      item.fair_person_name?.toLowerCase().includes(query) ||
      item.fair_person_mobile?.toLowerCase().includes(query) ||
      item.fair_categygroup?.toLowerCase().includes(query)
    );
  });

  // Calculate total number of pages
  const totalPages = Math.ceil(searchRegister.length / itemsPerPage);

  // Get current items
  const currentItems = searchRegister.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" className=" bg-blue-100 mb-8 p-6">
            <Typography variant="h6" color="black">
              Registration List
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            {/* search box  uper p-4   */}
            <div className=" w-full p-2 ">
              <form>
                <div className="relative">
                  <AiOutlineSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-600" />
                  <input
                    type="search"
                    placeholder="Search by Firm Name, Fair ID, Person Name, Mobile No, Category  "
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    // pl-8 niche
                    className="w-full pl-10 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </form>
            </div>
            <div className=" overflow-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                      SL. No
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Fair Id
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Firm Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Person Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Mobile No.
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Category Type
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Profession
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                      No. of People
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`${
                          item.fair_print_status === "Printed"
                            ? "bg-green-50"
                            : ""
                        }`}
                      >
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {index + 1 + (currentPage - 1) * itemsPerPage}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {item.fair_id}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {item.fair_firm_name}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {item.fair_person_name}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {item.fair_person_mobile}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {item.fair_categygroup}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {item.fair_profession || "N/A"}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {item.fair_no_of_people}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                          <button className="text-blue-600 hover:text-blue-900">
                            <FaPrint />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="9"
                        className="px-4 py-2 text-center text-gray-500"
                      >
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination  */}
            <div className="flex justify-between mt-4 p-2">
              <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  handlePageChange(Math.min(currentPage + 1, totalPages))
                }
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default Registration;
