interface Props {
  visible: boolean;
  handleClick: () => void;
}

const ContactModal = ({ visible, handleClick }: Props) => {
  return (
      <div className={`${visible ? 'fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50' : 'hidden'}`}>
          <div className="w-[300px] min-h-[250px] bg-white rounded-lg shadow-lg">
              <h3 className="text-center text-xl font-semibold p-4 border-b border-gray-200">Contact Parent</h3>
              
              <textarea
                  rows={4}
                  placeholder="Write your message here"
                  className="block w-[90%] mx-auto mt-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-slate-400 bg-slate-100"
              />

              <div className="flex justify-between p-4 mt-4">
                  <button
                      onClick={handleClick}
                      className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
                  >
                      Cancel
                  </button>
                  <button
                      onClick={handleClick}
                      className="px-4 py-2 text-white bg-slate-500 rounded-md hover:bg-slate-600 focus:outline-none"
                  >
                      Send
                  </button>
              </div>
          </div>
      </div>
  );
}

export default ContactModal;
