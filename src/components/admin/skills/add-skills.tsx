import useSkills from "@/hooks/useSkills";
import AddSkills from "./add-skills-form";

const SkillsAdminView = () => {
  const skillsData = useSkills();

  return (
    <div className="mt-6">
      <div className="bg-gray-900">
        {skillsData?.map((item) => (
          <div key={item._id}>
            <AddSkills skillsId={item?._id} initialData={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsAdminView;
