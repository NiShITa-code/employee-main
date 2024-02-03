import Button from "../reusable_ui/Button";
import Modal from "../reusable_ui/Modal";
import CreateCabinForm from "./CreateCabinForm";


function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="form">
          <div className="text-green-500 font-semibold items-center border">
          <Button>Add Employee</Button>
          </div>

        </Modal.Open>
        <Modal.Window name="form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
