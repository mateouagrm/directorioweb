import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const SidebarCategories = ({ isOpen, onClose, categories = [] }) => {
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [expandedSubCategories, setExpandedSubCategories] = useState([]);
  const navigate = useNavigate(); // ✅ Usamos el hook de React Router

  const handleCategoryClick = (category) => {
    // if (category.categories && category.categories.length > 0) {
    setExpandedCategories((prev) =>
      prev.includes(category.id)
        ? prev.filter((id) => id !== category.id)
        : [...prev, category.id]
    );
    // } else {
    //   navigate(`/categoria/${category.slug}`); // ✅ Navegación SPA
    //   onClose();
    // }
  };

  const handleSubCategoryClick = (subCategory, categorySlug) => {
    // if (subCategory.sub_categories && subCategory.sub_categories.length > 0) {
    setExpandedSubCategories((prev) =>
      prev.includes(subCategory.id)
        ? prev.filter((id) => id !== subCategory.id)
        : [...prev, subCategory.id]
    );
    // } else {
    //   navigate(`/categoria/${categorySlug}/${subCategory.slug}`); // ✅ Navegación SPA
    //   onClose();
    // }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[400px] bg-white z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } shadow-lg`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h5 className="text-lg font-bold">Categorías</h5>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} className="text-lg ml-2" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-100px)]">
          <ul className="p-4">
            {categories.map((category) => (
              <li key={category.id} className="mb-2 border-b border-gray-200">
                <div>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className="flex items-center justify-between p-2 text-gray-800 w-full text-left uppercase hover:text-white hover:bg-ecoprimary1 transition-colors duration-300 rounded-[6px]"
                  >
                    <span className="font-bold">{category.name}</span>
                    <FontAwesomeIcon icon={faChevronRight} className="text-lg ml-2" />

                  </button>

                  {expandedCategories.includes(category.id) && (
                    <ul className="pl-4 mt-2">
                      <li className="mb-2">
                        <Link
                          to={`/categoria/${category.slug}`}
                          onClick={onClose}
                          className="bg-gray-200 justify-between px-2 text-sm text-gray-700 pl-4 py-1 block no-underline hover:text-white hover:bg-ecoprimary1 transition-colors duration-300 rounded-[6px]"
                        >
                          TODOS LOS PRODUCTOS
                        </Link>
                      </li>

                      {(category.categories || category.sub_categories).map((subCategory) => (
                        <li key={subCategory.id} className="mb-2">
                          <div>
                            <button
                              onClick={() => handleSubCategoryClick(subCategory, category.slug)}
                              className="flex items-center justify-between px-2 text-sm text-gray-700 pl-4 py-1 w-full text-left hover:text-white hover:bg-ecoprimary1 transition-colors duration-300 rounded-[6px]"
                            >
                              <span>{subCategory.name}</span>
                              {subCategory.sub_categories && subCategory.sub_categories.length > 0 && (
                                <FontAwesomeIcon icon={faChevronRight} className="text-sm ml-2" />
                              )}
                            </button>

                            {expandedSubCategories.includes(subCategory.id) &&
                              subCategory.sub_categories && (
                                <ul className="pl-4 mt-2">
                                  <li className="mb-2">
                                    <Link
                                      to={`/categoria/${category.slug}/${subCategory.slug}`}
                                      onClick={onClose}
                                      className="bg-gray-200 justify-between px-2 text-sm text-gray-700 pl-4 py-1 block no-underline hover:text-white hover:bg-ecoprimary1 transition-colors duration-300 rounded-[6px]"
                                    >
                                      TODOS LOS PRODUCTOS
                                    </Link>
                                  </li>

                                  {subCategory.sub_categories.map((subSubCategory) => (
                                    <li key={subSubCategory.id} className="mb-2">
                                      <Link
                                        to={`/categoria/${category.slug}/${subCategory.slug}/${subSubCategory.slug}`}
                                        onClick={onClose}
                                        className="text-sm text-gray-600 pl-4 py-1 block no-underline hover:text-white hover:bg-ecoprimary1 transition-colors duration-300 rounded-[6px]"
                                      >
                                        {subSubCategory.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SidebarCategories;
