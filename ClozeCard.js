function ClozeCard(text,cloze)
{
	this.text=text.split(cloze);
	this.cloze=cloze;
};

function ClozeCardFunc()
{
	this.clozeDeleted=function(){
		return `{$this.text[0]}...${this.text[1]}`;
	}
}
ClozeCard.prototype=new ClozeCardFunc();
module.exports=ClozeCard;