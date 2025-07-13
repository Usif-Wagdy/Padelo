/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

export default function InfoCardsSection({
  title,
  items,
  bgColor,
  bgImage,
  cardBgColor,
}) {
  return (
    <section
      className={`min-h-150 flex flex-col items-center justify-center py-20 px-6 text-center ${bgColor} bg-cover bg-center relative`}
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
    >
      {bgImage && (
        <div
          className={`absolute inset-0 ${bgColor} dark:bg-gray-900 opacity-50 dark:opacity-91`}
        ></div>
      )}
      <div className="relative z-10 w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 md:mb-16">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {items.map((item, i) => {
            const isString = typeof item === "string";
            return (
              <motion.div
                key={i}
                className={`p-6 md:p-8 ${cardBgColor} rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 flex flex-col`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {isString ? (
                  <>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                      {item}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-base">
                      Learn how to {item.toLowerCase()} with Padelo.
                    </p>
                  </>
                ) : (
                  <>
                    {item.icon && (
                      <div className="text-4xl text-[#009c85] mb-4 flex justify-center">
                        <item.icon className="w-10 h-10 md:w-12 md:h-12" />
                      </div>
                    )}
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1 flex-grow">
                      {item.description}
                    </p>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
