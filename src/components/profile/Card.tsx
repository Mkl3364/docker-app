interface AccountCardInterface {
    content: string;
}

const Card = ({content} : AccountCardInterface) => {
  return (
    <div className="bg-white rounded-lg text-center mx-60 h-32 flex justify-center items-center">
      {content}
    </div>
  );
};

export default Card;
